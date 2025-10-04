# 🚀 AstroVia - AI-Powered Asteroid Detection & Impact Simulation

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://astrovia.vercel.app)
[![NASA Space Apps](https://img.shields.io/badge/NASA-Space%20Apps%20Challenge%202025-blue?style=for-the-badge&logo=nasa)](https://www.spaceappschallenge.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

## 🌟 Overview

AstroVia is an advanced web application for AI-powered asteroid detection and impact simulation, developed for NASA Space Apps Challenge 2025. The platform combines cutting-edge technology with user-friendly interfaces to make asteroid threat assessment accessible to everyone.

## ✨ Features

### 🔍 Blink Analysis System
- **FITS Image Processing**: Upload and analyze astronomical images
- **AI-Powered Detection**: Automated asteroid candidate identification
- **Real-time Processing**: Complete analysis in seconds instead of minutes
- **Export Capabilities**: Download blink.gif and candidates.csv files

### 💥 Impact Simulation
- **Interactive Parameters**: Adjust diameter, velocity, angle, and density
- **Real-time Visualization**: Leaflet-based interactive maps
- **Comprehensive Analysis**: Energy calculations, crater sizes, shock wave effects
- **PDF Reports**: Download detailed impact analysis reports

### 🌍 Multi-language Support
- **Turkish & English**: Complete localization
- **Dynamic Translation**: Real-time language switching
- **Persistent Settings**: Language preferences saved

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: Custom CSS with CSS Grid & Flexbox
- **Animations**: AOS.js for scroll animations
- **Maps**: Leaflet.js for interactive mapping
- **Data Visualization**: Plotly.js for charts
- **Icons**: Emoji-based icon system
- **Deployment**: Vercel

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/astrovia/astrovia.git
   cd astrovia
   ```

2. **Start local server**
   ```bash
   # Using Python
   python -m http.server 8080
   
   # Using Node.js
   npx serve -s . -l 8080
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Production URL**
   ```
   https://astrovia.vercel.app
   ```

## 📁 Project Structure

```
astrovia/
├── index.html          # Landing page
├── detect.html         # Blink analysis page
├── impact.html         # Impact simulation page
├── about.html          # About page
├── legal.html          # Legal information
├── style.css           # Main stylesheet
├── main.js             # JavaScript functionality
├── vercel.json         # Vercel configuration
├── package.json        # Project metadata
└── README.md           # This file
```

## 🎯 Key Features

### Blink Analysis
- FITS file upload with drag & drop
- 3-step progress visualization
- AI-powered candidate detection
- Export capabilities (GIF, CSV)

### Impact Simulation
- Interactive parameter sliders
- Real-time map visualization
- Comprehensive impact calculations
- PDF report generation

### User Experience
- Responsive design for all devices
- Smooth animations and transitions
- Intuitive navigation
- Multi-language support

## 🌐 Data Sources

- **NASA NeoWs API**: Near-Earth Object data
- **USGS API**: Geological survey data
- **ESA Space Situational Awareness**: European space data
- **MAST Archive**: Space telescope data

## 📊 Performance

- **Fast Loading**: Optimized assets and lazy loading
- **Responsive**: Mobile-first design approach
- **Accessible**: WCAG 2.1 compliance
- **SEO Optimized**: Meta tags and structured data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Ömer Bayram** - Software & Web Development
- **Sadık Usta** - Software & Web Development  
- **Yağız Efe Dere** - Software & Web Development
- **Ayşegül Yabacı** - Team Captain
- **Hakkı Burak** - Research Specialist
- **Reyyan** - Research Specialist

## 🏆 Awards

- **NASA Space Apps Challenge 2025** - Participant
- **Educational Excellence** - Asteroid Defense Education

## 📞 Contact

- **Website**: [astrovia.vercel.app](https://astrovia.vercel.app)
- **Email**: info@astrovia.space
- **GitHub**: [github.com/astrovia](https://github.com/astrovia)

## 🙏 Acknowledgments

- NASA for providing asteroid data
- USGS for geological information
- ESA for space situational awareness data
- The open-source community for amazing tools

---

**⚠️ Disclaimer**: This tool is for educational and awareness purposes only. It is not an official early warning system. For real asteroid threat assessment, consult official space agencies.

**🌍 Made with ❤️ for NASA Space Apps Challenge 2025**