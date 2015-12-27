# KanjivgAnimate   
  
##### Easy animation for [KanjiVG](https://github.com/KanjiVG/kanjivg) SVG files.

### Quick Guide
  - [Install](#install)
  - [Usage](#usage)

## Install
Download the min.js file or install through npm:
```
npm install kanjivganimate --save
```

## Usage
#### Animate an svg by clicking directly on the svg
Include the min.js script located in KanjivgAnimate/dist.

Instantiate KanjivgAnimate and pass it a DOM selector.
```javascript
new KanjivgAnimate('.kanjiVG');
```

Pass an optional time value to speed up or slow down the animation.
```
new KanjivgAnimate('.kanjiVG', '1s');
```
If no time is passed, the default time of .6 seconds (.6s) will be used.

Make sure the KanjiVG svg tag also has the selector.
```html
<svg class="kanjiVG" xmlns="http://www.w3.org/2000/svg" width="109" height="109" viewBox="0 0 109 109">
    <g style="fill:none;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;">
        <!-- paths -->
    </g>
    <g style="font-size:8">
        <!-- optional text numbers -->
    </g>
</svg>
```
Thats it.   

#### Animate an svg by clicking on something else
Include the min.js file and pass the selector of the element you want to trigger the animation with.
```javascript
new KanjivgAnimate('.kanjivg-button');
```

On the clickable element, add a `data-kanjivg-target` attribute and pass it the ID of the svg tag to animate.
```html
<div>
    <svg id="animateMe" class="kanjiVG" xmlns="http://www.w3.org/2000/svg" width="109" height="109" viewBox="0 0 109 109">
        <g style="fill:none;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;">
            <!-- paths -->
        </g>
        <g style="font-size:8">
            <!-- optional text numbers -->
        </g>
    </svg>
</div>

<button class="kanjivg-button" data-kanjivg-target="#animateMe">Animate</button>
```

KanjiVG is copyright Ulrich Apel and released under the Creative Commons Attribution-Share Aline 3.0 licence.
