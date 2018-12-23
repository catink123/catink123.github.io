# kshr-ctrls CSS library
*kshr-ctrls* is a CSS library that adds a colorable style to UI elements such as buttons, textboxes, sliders and progress bars.

## Includes
* Buttons:
  * Normal
  * Flat
  * Transparent
* Progress Bar
* Textbox
* Slider
* Checkbox

## Usage
### Adding library
Download and copy *kshr-ctrls.css* from *css* folder to your desired folder (i. e. *css* folder in your website resources). Then define link to the library in your `<head>` tag.
```html
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="/example-css-folder/kshr-ctrls.css">
  </head>
  <body>
    ...
  </body>
</html>
```
### Adding elements
Adding elements is simple but it is not the same for all elements.

#### Button:
* Normal:
```html
<button class="kshr-btn">Button</button>
```
  * Flat:
```html
<button class="kshr-btn-flat">Button</button>
```
  * Transparent:
```html
<button class="kshr-btn-transparent">Button</button>
```
For wide variant of all buttons, add *kshr-wide_btn* to *class* property.
```html
<button class="kshr-btn kshr-wide_btn">Button</button>
```

Demo of buttons is [here](https://catink123.github.io/controls).

#### Progress Bar:
```html
<progress class="kshr-prgbar" max="100" value="50">
```
For wide variant add *kshr-wide_prgbar* to *class* property.
```html
<progress class="kshr-prgbar kshr-wide_prgbar" max="100" value="50">
```
#### Textbox:
```html
<input class="kshr-txtbox" type="text">
```
For wide variant add *kshr-wide_btn* to *class* property.
```html
<input class="kshr-txtbox kshr-wide_btn" type="text">
```
#### Slider:
```html
<input class="kshr-slider" type="range" max="100" value="50">
```
For wide variant add *kshr-wide_slider* to *class* property.
```html
<input class="kshr-slider kshr-wide_slider" type="range" max="100" value="50">
```
#### Checkbox:
```html
<input class="kshr-chk" type="checkbox">
```
For wide variant add *kshr-wide_chk* to *class* property.
```html
<input class="kshr-chk kshr-wide_chk" type="checkbox">
```

### Change color
To change of *kshr* elements, add a new class in your stylesheet and set *--color* to a number. To get this number, find *HSL* color picker (i. e. go to Google and type in ["color picker"](https://www.google.com/search?q=color+picker)), then choose the color you want and copy the first *H* value in *HSL*. For example in color "hsl(**150**, 100%, 50%)" copy the first bold number. After adding the *--color* variable:
```css
.myelem {
  --color: 150;
}
```
Add the class to the element:
```html
<button class="kshr-btn myelem">Colored Button</button>
```
