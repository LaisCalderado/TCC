import os

from torch.utils.data import DataLoader
from torchvision.datasets import ImageFolder
from tqdm.notebook import tqdm
import torch.nn.functional as F
import torchvision.transforms as T
from torchvision.utils import save_image
from IPython.display import Image
import torch
import torch.nn as nn
from torchvision.utils import make_grid
import matplotlib.pyplot as plt
%matplotlib inline
DATA_DIR = '../input/pokemon-images-dataset/pokemon_jpg'
print(os.listdir(DATA_DIR))

print(os.listdir(DATA_DIR+'/pokemon_jpg')[:10])

image_size = 64
batch_size = 128
stats = (0.5, 0.5, 0.5), (0.5, 0.5, 0.5)

train_ds = ImageFolder(DATA_DIR, transform=T.Compose([T.Resize(image_size),
                                            T.CenterCrop(image_size),
                                            T.ToTensor(),
                                            T.Normalize(*stats)]))
train_dl = DataLoader(train_ds, batch_size, shuffle=True, num_workers=3, pin_memory=True)

def denorm(img_tensors):
    return img_tensors * stats[1][0] + stats[0][0]

def show_images(images,nmax=64):
      fig, ax = plt.subplots(figsize=(8,8))
  ax.set_xticks([]); ax.set_xticks([])
  ax.imshow(make_grid(denorm(images.detach()[:nmax]), nrow=8).permute(1,2,0))

def show_batch(dl, nmax=64):
  for images, _ in dl:
    show_images(images, nmax)
    break

show_batch(train_dl)

def get_default_device():
    """Pick GPU if available, else CPU"""
    if torch.cuda.is_available():
        return torch.device('cuda')
    else:
        return torch.device('cpu')
    
def to_device(data, device):
    """Move tensor(s) to chosen device"""
    if isinstance(data, (list,tuple)):
        return [to_device(x, device) for x in data]
    return data.to(device, non_blocking=True)

class DeviceDataLoader():
    """Wrap a dataloader to move data to a device"""
    def __init__(self, dl, device):
        self.dl = dl
        self.device = device
        
    def __iter__(self):
        """Yield a batch of data after moving it to device"""
        for b in self.dl: 
            yield to_device(b, self.device)

    def __len__(self):
        """Number of batches"""
        return len(self.dl)

device = get_default_device()
device

train_dl = DeviceDataLoader(train_dl, device)

discriminator = nn.Sequential(
    # in: 3 x 64 x 64

    nn.Conv2d(3, 64, kernel_size=4, stride=2, padding=1, bias=False),
    nn.BatchNorm2d(64),
    nn.LeakyReLU(0.2, inplace=True),
    # out: 64 x 32 x 32

    nn.Conv2d(64, 128, kernel_size=4, stride=2, padding=1, bias=False),
    nn.BatchNorm2d(128),
    nn.LeakyReLU(0.2, inplace=True),
    # out: 128 x 16 x 16

    nn.Conv2d(128, 256, kernel_size=4, stride=2, padding=1, bias=False),
    nn.BatchNorm2d(256),
    nn.LeakyReLU(0.2, inplace=True),
    # out: 256 x 8 x 8

    nn.Conv2d(256, 512, kernel_size=4, stride=2, padding=1, bias=False),
    nn.BatchNorm2d(512),
    nn.LeakyReLU(0.2, inplace=True),
    # out: 512 x 4 x 4

    nn.Conv2d(512, 1, kernel_size=4, stride=1, padding=0, bias=False),
    # out: 1 x 1 x 1

    nn.Flatten(),
    nn.Sigmoid())

discriminator = to_device(discriminator, device)

latent_size = 128

generator = nn.Sequential(
    # in: latent_size x 1 x 1

    nn.ConvTranspose2d(latent_size, 512, kernel_size=4, stride=1, padding=0, bias=False),
    nn.BatchNorm2d(512),
    nn.ReLU(True),
    # out: 512 x 4 x 4

    nn.ConvTranspose2d(512, 256, kernel_size=4, stride=2, padding=1, bias=False),
    nn.BatchNorm2d(256),
    nn.ReLU(True),
    # out: 256 x 8 x 8

    nn.ConvTranspose2d(256, 128, kernel_size=4, stride=2, padding=1, bias=False),
    nn.BatchNorm2d(128),
    nn.ReLU(True),
    # out: 128 x 16 x 16

    nn.ConvTranspose2d(128, 64, kernel_size=4, stride=2, padding=1, bias=False),
    nn.BatchNorm2d(64),
    nn.ReLU(True),
    # out: 64 x 32 x 32

    nn.ConvTranspose2d(64, 3, kernel_size=4, stride=2, padding=1, bias=False),
    nn.Tanh()
    # out: 3 x 64 x 64
)

xb = torch.randn(batch_size, latent_size, 1, 1) # random latent tensors
fake_images = generator(xb)
print(fake_images.shape)
show_images(fake_images)

generator = to_device(generator, device)

def train_discriminator(real_images, opt_d):
    # Clear discriminator gradients
    opt_d.zero_grad()

    # Pass real images through discriminator
    real_preds = discriminator(real_images)
    real_targets = torch.ones(real_images.size(0), 1, device=device)
    real_loss = F.binary_cross_entropy(real_preds, real_targets)
    real_score = torch.mean(real_preds).item()
    
    # Generate fake images
    latent = torch.randn(batch_size, latent_size, 1, 1, device=device)
    fake_images = generator(latent)

    # Pass fake images through discriminator
    fake_targets = torch.zeros(fake_images.size(0), 1, device=device)
    fake_preds = discriminator(fake_images)
    fake_loss = F.binary_cross_entropy(fake_preds, fake_targets)
    fake_score = torch.mean(fake_preds).item()

    # Update discriminator weights
    loss = real_loss + fake_loss
    loss.backward()
    opt_d.step()
    return loss.item(), real_score, fake_score

def train_generator(opt_g):
    # Clear generator gradients
    opt_g.zero_grad()
    
    # Generate fake images
    latent = torch.randn(batch_size, latent_size, 1, 1, device=device)
    fake_images = generator(latent)
    
    # Try to fool the discriminator
    preds = discriminator(fake_images)
    targets = torch.ones(batch_size, 1, device=device)
    loss = F.binary_cross_entropy(preds, targets)
    
    # Update generator weights
    loss.backward()
    opt_g.step()
    
    return loss.item()

sample_dir = 'generated'
os.makedirs(sample_dir, exist_ok=True)

def save_samples(index, latent_tensors, show=True):
    fake_images = generator(latent_tensors)
    fake_fname = 'generated-images-{0:0=4d}.png'.format(index)
    save_image(denorm(fake_images), os.path.join(sample_dir, fake_fname), nrow=8)
    print('Saving', fake_fname)
    if show:
        fig, ax = plt.subplots(figsize=(8, 8))
        ax.set_xticks([]); ax.set_yticks([])
        ax.imshow(make_grid(fake_images.cpu().detach(), nrow=8).permute(1, 2, 0))

fixed_latent = torch.randn(64, latent_size, 1, 1, device=device)


def fit(epochs, lr, start_idx=1):
    torch.cuda.empty_cache()
    
    # Losses & scores
    losses_g = []
    losses_d = []
    real_scores = []
    fake_scores = []
    
    # Create optimizers
    opt_d = torch.optim.Adam(discriminator.parameters(), lr=lr, betas=(0.5, 0.999))
    opt_g = torch.optim.Adam(generator.parameters(), lr=lr, betas=(0.5, 0.999))
    
    for epoch in range(epochs):
        for real_images, _ in tqdm(train_dl):
            # Train discriminator
            loss_d, real_score, fake_score = train_discriminator(real_images, opt_d)
            # Train generator
            loss_g = train_generator(opt_g)
            
        # Record losses & scores
        losses_g.append(loss_g)
        losses_d.append(loss_d)
        real_scores.append(real_score)
        fake_scores.append(fake_score)
        
        # Log losses & scores (last batch)
        print("Epoch [{}/{}], loss_g: {:.4f}, loss_d: {:.4f}, real_score: {:.4f}, fake_score: {:.4f}".format(
            epoch+1, epochs, loss_g, loss_d, real_score, fake_score))
    
        # Save generated images
        save_samples(epoch+start_idx, fixed_latent, show=False)
    
    return losses_g, losses_d, real_scores, fake_scores

lr = 0.0002
epochs = 1000

history = fit(epochs, lr)

losses_g, losses_d, real_scores, fake_scores = history

# Save the model checkpoints 
torch.save(generator.state_dict(), 'G.pth')
torch.save(discriminator.state_dict(), 'D.pth')

Image('./generated/generated-images-0001.png')

Image('./generated/generated-images-0020.png')

Image('./generated/generated-images-0100.png')

Image('./generated/generated-images-0200.png')

Image('./generated/generated-images-0300.png')

Image('./generated/generated-images-0400.png')

Image('./generated/generated-images-0500.png')

plt.plot(real_scores, '-')
plt.plot(fake_scores, '-')
plt.xlabel('epoch')
plt.ylabel('score')
plt.legend(['Real', 'Fake'])
plt.title('Scores');

plt.plot(losses_d, '-')
plt.plot(losses_g, '-')
plt.xlabel('epoch')
plt.ylabel('loss')
plt.legend(['Discriminator', 'Generator'])
plt.title('Losses');



import os
import cv2
import torch
import torch.nn as nn
import torchvision.transforms as T
from torch.utils.data import DataLoader
from torchvision.datasets import ImageFolder
from torchvision.utils import make_grid
from tqdm import tqdm
from tqdm.notebook import tqdm
import torch.nn.functional as F
from torchvision.utils import save_image
from IPython.display import Image
import matplotlib.pyplot as plt
%matplotlib inline

def load_data(data_dir, image_size=64, batch_size=128):
    stats = (0.5, 0.5, 0.5), (0.5, 0.5, 0.5)
    
    train_ds = ImageFolder(data_dir, transform=T.Compose([T.Resize(image_size),
                                                T.CenterCrop(image_size),
                                                T.ToTensor(),
                                                T.Normalize(*stats)]))
    
    train_dl = DataLoader(train_ds, batch_size, shuffle=True, num_workers=3, pin_memory=True)
    
    return train_dl

# Atribui o caminho do diretório de dados à variável data_dir
data_dir = '../input/pokemon-images-dataset/pokemon_jpg'

# Carrega o conjunto de dados usando a função load_data e o caminho do diretório de dados
train_dl = load_data(data_dir)


# Imprime os arquivos de imagem na pasta de dados
print(os.listdir(data_dir))

# Imprime os primeiros 10 arquivos de imagem na subpasta "pokemon_jpg"
print(os.listdir(os.path.join(data_dir, 'pokemon_jpg'))[:10])

# Set some variables for the dataset
image_size = 64
batch_size = 128
stats = (0.5, 0.5, 0.5), (0.5, 0.5, 0.5)

def show_images(images, nmax=64):
    fig, ax = plt.subplots(figsize=(8,8))
    ax.set_xticks([]); ax.set_yticks([])
    ax.imshow(make_grid(denorm(images.detach()[:nmax]), nrow=8).permute(1,2,0).cpu().numpy())

def show_batch(dl, nmax=64):
    for images, _ in dl:
        show_images(images, nmax)
        break

show_batch(train_dl)

def get_default_device():
    """Pick GPU if available, else CPU"""
    if torch.cuda.is_available():
        return torch.device('cuda')
    else:
        return torch.device('cpu')
    
def to_device(data, device):
    if isinstance(data, (list,tuple)):
        return [to_device(x, device) for x in data]
    return data.to(device, non_blocking=True)

class DeviceDataLoader():
    """Wrap a dataloader to move data to a device"""
    def __init__(self, dl, device):
        self.dl = dl
        self.device = device
        
    def __iter__(self):
        """Yield a batch of data after moving it to device"""
        for b in self.dl: 
            yield to_device(b, self.device)
        
    def __len__(self):
        """Number of batches"""
        return len(self.dl)

device = get_default_device()
train_dl = DeviceDataLoader(train_dl, device)

class Discriminator(nn.Module):
    def __init__(self, channels=[3, 64, 128, 256, 512]):
        super().__init__()
        layers = []
        for i in range(len(channels)-1):
            layers += [
                nn.Conv2d(channels[i], channels[i+1], kernel_size=4, stride=2, padding=1, bias=False),
                nn.BatchNorm2d(channels[i+1]),
                nn.LeakyReLU(0.2, inplace=True),
            ]
        layers += [
            nn.Conv2d(channels[-1], 1, kernel_size=4, stride=1, padding=0, bias=False),
            nn.Flatten(),
            nn.Sigmoid(),
        ]
        self.model = nn.Sequential(*layers)

    def forward(self, x):
        return self.model(x)
    
discriminator = Discriminator().to(device)
discriminator = to_device(discriminator, device)

latent_size = 128
class Generator(nn.Module):
    def __init__(self, latent_size, channels=[128, 64, 32, 3]):
        super().__init__()
        layers = []
        for i in range(len(channels)-1):
            layers += [
                nn.ConvTranspose2d(latent_size if i == 0 else channels[i],
                                   channels[i+1],
                                   kernel_size=4,
                                   stride=2,
                                   padding=1,
                                   bias=False),
                nn.BatchNorm2d(channels[i+1]),
                nn.ReLU(inplace=True),
            ]
            if i == len(channels)-2:
                layers[-1] = nn.Tanh() # last layer of generator

        self.net = nn.Sequential(*layers)

    def forward(self, x):
        x = x.view(x.size(0), -1, 1, 1)
        return self.net(x)

generator = Generator(latent_size).to(device)
generator = to_device(generator, device)
fake_images = generator(torch.randn(batch_size, latent_size, 1, 1).to(device))

# Generate 64 fake images
latent = torch.randn(64, latent_size, 1, 1, device=device)
fake_images = generator(latent)

# Show the fake images
show_images(fake_images.cpu(), nmax=64)

generator = to_device(generator, device)

def train_discriminator(real_images, latent_size, discriminator, generator, opt_d, device):
    # Clear discriminator gradients
    opt_d.zero_grad()

    # Generate fake images
    latent = torch.randn(real_images.size(0), latent_size, 1, 1, device=device)
    fake_images = generator(latent)

    # Calculate loss on real and fake images
    real_pred = discriminator(real_images)
    fake_pred = discriminator(fake_images.detach())
    loss_real = F.binary_cross_entropy_with_logits(real_pred, torch.ones_like(real_pred, device=device))
    loss_fake = F.binary_cross_entropy_with_logits(fake_pred, torch.zeros_like(fake_pred, device=device))
    loss_d = (loss_real + loss_fake) / 2

    # Backward pass and optimization step
    loss_d.backward()
    opt_d.step()

    # Calculate discriminator scores
    real_score = torch.mean(real_pred).item()
    fake_score = torch.mean(fake_pred).item()

    return loss_d.item(), real_score, fake_score

def train_generator(generator, discriminator, opt_g, batch_size, latent_size, device):
    # Clear generator gradients
    opt_g.zero_grad()

    # Generate fake images
    latent = torch.randn(batch_size, latent_size, 1, 1, device=device)
    fake_images = generator(latent)

    # Try to fool the discriminator
    preds = discriminator(fake_images)
    targets = torch.ones(batch_size, 1, device=device)
    loss = F.binary_cross_entropy(preds, targets)

    # Update generator weights
    loss.backward()
    opt_g.step()

    return loss.item()


sample_dir = 'generated'
os.makedirs(sample_dir, exist_ok=True)

def save_samples(index, latent_tensors, show=True):
    fake_images = generator(latent_tensors)
    fake_fname = 'generated-images-{0:0=4d}.png'.format(index)
    save_image(denorm(fake_images), os.path.join(sample_dir, fake_fname), nrow=8)
    print('Saving', fake_fname)
    if show:
        fig, ax = plt.subplots(figsize=(8, 8))
        ax.set_xticks([]); ax.set_yticks([])
        ax.imshow(make_grid(denorm(fake_images), nrow=8).permute(1, 2, 0))
        plt.show()

fixed_latent = torch.randn(64, latent_size, 1, 1, device=device)

def fit(epochs, lr, latent_size, start_idx=1):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    # Losses & scores
    losses_g = []
    losses_d = []
    real_scores = []
    fake_scores = []
    
    # Create optimizers
    opt_d = torch.optim.Adam(discriminator.parameters(), lr=lr, betas=(0.5, 0.999))
    opt_g = torch.optim.Adam(generator.parameters(), lr=lr, betas=(0.5, 0.999))
    
    for epoch in range(epochs):
        try:
            for real_images, _ in tqdm(train_dl):
                # Train discriminator
                loss_d, real_score, fake_score = train_discriminator(real_images, latent_size, discriminator, generator, opt_d, device)
                # Train generator
                loss_g = train_generator(generator, discriminator, opt_g, batch_size, latent_size, device)

            # Record losses & scores
            losses_g.append(loss_g)
            losses_d.append(loss_d)
            real_scores.append(real_score)
            fake_scores.append(fake_score)

            # Log losses & scores (last batch)
            print("Epoch [{}/{}], loss_g: {:.4f}, loss_d: {:.4f}, real_score: {:.4f}, fake_score: {:.4f}".format(
                epoch+1, epochs, loss_g, loss_d, real_score, fake_score))

            # Save generated images
            save_samples(epoch+start_idx, fixed_latent, show=False)

        except Exception as e:
            print('Error:', e)
            torch.cuda.empty_cache()

    return losses_g, losses_d, real_scores, fake_scores

# Defina os parâmetros de treinamento
epochs = 10
lr = 0.0002
latent_size = 64

# Inicie o treinamento
history = fit(epochs, lr, latent_size)

losses_g, losses_d, real_scores, fake_scores = history

