# Wan AI Video Generator - WebUI

A webui project for generating high-quality AI videos using the Wan2.1 open-source model.


## Overview

Wan AI Video Generator is an open source project that allows users to generate professional-quality videos from text prompts or images, The project generates text prompt by Fal API, featuring easy one-click website deployment.


## Wan 2.1 Features

- **Text-to-Video Generation**: Create videos from detailed text descriptions
- **Image-to-Video Conversion**: Transform static images into dynamic videos
- **Video Editing**: Make precise adjustments to generated videos
- **Visual Text Generation**: Generate dynamic text in videos (English and Chinese)
- **Sound Effects & Music**: Auto-generate audio that aligns with visual content
- **Consumer Hardware Friendly**: Works with standard consumer GPUs


## 🛠️ Tech Stack

- Next.js
- Fal SDK
- Next-Auth for user auth
- Drizzle ORM + postgres for data processing
- Cloudflare R2
- TailwindCSS
- Shadcn UI


## 🚀 Quick Start

Follow these steps to get started:

1. Clone the repository:

```
git clone https://github.com/candytools-ai/wan2.1-webui
cd wan2.1-webui
```

2. Install dependencies:

```
pnpm install
```

3. Set up API keys:

- copy .env.example and rename it to .env:

```
NODE_ENV=development
NEXT_PUBLIC_NODE_ENV=development

AUTH_URL=
NEXT_PUBLIC_URL=

# GOOGLE
GOOGLE_ID=
GOOGLE_SECRET=

# GITHUB
GITHUB_ID=
GITHUB_SECRET=

AUTH_SECRET=
NEXTAUTH_SECRET=

POSTGRES_URL=
AUTH_DRIZZLE_URL=

FAL_KEY=
NEXT_PUBLIC_FAL_WEBHOOK_HOST=

LEMON_SQUEEZY_STORE_ID=
LEMON_SQUEEZY_PRODUCT_ID=
LEMON_SQUEEZY_WEBHOOK_SIGNATURE=
LEMON_SQUEEZY_API_KEY=
```

4. Run the app:

```
pnpm dev
```

5. Access the platform:
Open your browser and navigate to http://localhost:3000.


Deploy on Vercel (Don't forget to setup env)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/candytools-ai/wan2.1-webui.git&project-name=wan2.1-webui&repository-name=wan2.1-webui)


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.


## 🧑‍💻 Link Me

Twitter: [https://x.com/candytools118](https://x.com/candytools118)

Project Link: [https://github.com/candytools-ai/wan2.1-webui](https://github.com/candytools-ai/wan2.1-webui)

Website: [Wan 2.1 AI](https://wan21.net)

if this project is helpful to you, buy me a coffee.

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/wuyasong)