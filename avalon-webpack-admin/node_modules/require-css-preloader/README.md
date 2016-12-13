# require-css-preloader
A webpack preloader to resolove AMD style module using css by requie-css

## Installation
`npm install require-css-preloader`

## Usage
```
module.exports = {
		module: {
			preLoaders: [{
				test: /\.js$/,
				loader: "require-css-preloader"
		}]
	}
}
```
## Description

while you use `require-css` to load css from `*.css`,and you don't want to edit your code but webpack cann't resolve this,so  you can use this preloader to resolve this.