module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor:{
        "app-purple":"#020617",
        "app-purple-light":"#050516",
        "spotify-green":"rgb(30 215 96)", // use like this :-   className="bg-spotify-green"
        // "app-black":"#1e1e1e", // used in spotify bg
        "app-black":"#050516"
      },
      fontFamily:{
        "poppins":["Poppins", "sans-serif"] // key will be the keyword used while giving tailwind classes like className="font-poppins"
      },
      height:{
        "1/10":"10%",
        "9/10":"90%"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

// run the below command each time u extend a font class :- 
// npx tailwindcss@2 build src/index.css -c tailwind.config.js -o src/output.css