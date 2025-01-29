# 🌍 PM2.5 Monitoring
A web application that provides PM2.5 pollution data along with health recommendations when you face air pollution.
## ✨ Feature
- 📊 Display PM2.5 levels with color-coded air quality indicators for better understanding.
- 🏥 Provide health care recommendations when PM2.5 levels exceed safety standards.
- 🌫 Provide information about the Air Quality Index (AQI).
## 📜 Technologies Used  
- 🏗 **HTML** - Structure of the website  
- 🎨 **CSS + Tailwind CSS** - UI design  
- ⚡ **JavaScript** - Fetching data from API and displaying results  
- 🌍 **OpenWeatherMap API** - Used to fetch air quality data
## 🔧 Setting up the OpenWeatherMap API Key

To ensure the project works properly, you need to use an **API Key** from OpenWeatherMap to fetch air quality and PM2.5 data.

### 📝 Steps to Set Up:
1. **Sign up for an account on OpenWeatherMap**  
   Go to [OpenWeatherMap](https://openweathermap.org/) and create an account if you don't have one already.

2. **Get your API Key**  
   After logging in, go to [API Keys](https://home.openweathermap.org/api_keys) to request your **API Key** for fetching data.

3. **Configure in your project**  
   Open the `script.js` file or the JavaScript file you're using in your project, then insert your received **API Key** into the `API_KEY` variable like this:

   ```js
   const apiKey = 'Your_apiKey'; // Place your API Key here
