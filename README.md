# PDF-Snake
In order to play open [this](https://github.com/AntonKorn/PDF-Snake/releases/download/0.1/Output.pdf) pdf file in chrome or any browser that supports pdf view with javascript

## What is it?
The repository itself is .NET Framework console application that creates pdf file with the game. Pdf file can be opened with chrome or any other browser that supports javascript in pdf. Only tested in Chrome and Edge. Got a lot of insights on what can and can not be done in browser reader from this repo https://github.com/osnr/horrifying-pdf-experiments

## How do i play?
3 "buttons" on the bottom are for game controls, central matrix is game area. They basically work like WASD.
![Divide tab](https://sun9-76.userapi.com/impg/zYRrxdVVLD8TPqafrMvNBv_0qx_qZHiO_ewYWQ/5WlMV0CHyjk.jpg?size=663x701&quality=96&sign=e1faec29f8527c35484dfd2aea476aa2&type=album)

## How does it work?
Every matrix element and "button" are inputs. As it is mentioned in "horrifying-pdf-experiments" article, we can't do much with javascript in browser reader. We can't even change the color of inputs, but we can move/resize them, listen for mouse events, show/hide them. In referenced article it is mentioned that moving elements is causing some artifacts and needs a hack, so I tried to use inputs as pixels of a display, like inside of consol or excel games you can easily find in web.

## Doesn't look impressive
Also this game itself doesn't look impressive, a lot of things can be done with this approach. We can make different colors by placing inputs on each other, we can listen for mouse inputs. So it has a potential to make any low resolution 2d game, or even 3d with knowledge of algorithms.
