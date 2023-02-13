module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
      ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
     
    },
   

};