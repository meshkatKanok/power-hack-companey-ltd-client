module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      fontFamily: {
            poppins: ['poppins', 'sans-serif'],
            raleway: ['Raleway', 'sans-serif'],
          },
      extend: {},
    },
    
    plugins: [require("daisyui")],
   
}