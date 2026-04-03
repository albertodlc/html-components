const div = document.createElement("div");
div.style.position = "absolute";
div.style.left = "0px";
div.style.top = "0px";
div.style.width = "100px";
div.style.height = "100px";

document.body.appendChild(div);


let isDragging = false;
let initialMouseX, initialMouseY;
const offset = {
    x: 0,
    y: 0
}

document.addEventListener('mousemove', (event) => {
    event.preventDefault();

    if (isDragging) {
        const mousePosition = {
            x : event.clientX,
            y : event.clientY
        };

        div.style.left = `${mousePosition.x + offset.x}px`;
        div.style.top = `${mousePosition.y + offset.y}px`;
    }
});

div.addEventListener('mousedown', (event) => {
    // Start dragging
    isDragging = true;

    // Get initial position
    initialMouseX = event.clientX; 
    initialMouseY = event.clientY;

    offset.x = div.offsetLeft - initialMouseX;
    offset.y = div.offsetTop - initialMouseY;
});

div.addEventListener('mouseup', (event) => {
    // Stop dragging
    isDragging = false; 
    console.log('Mouse up at:', event.clientX, event.clientY);

    if( div.offsetLeft < 0 ){
        div.style.left = `0px`;
    }

    if( div.offsetTop < 0 ){
        div.style.top = `0px`;
    }

    const GRID_OFFSET = 10;
    let gridNumX = Math.round((div.offsetLeft - GRID_OFFSET) / 20);
    let gridNumY = Math.round((div.offsetTop - GRID_OFFSET) / 20);

    // console.log(`OffsetX ${div.offsetLeft} - OffsetY ${div.offsetTop}`);
    // console.log(`OffsetX ${div.offsetLeft / 20} - OffsetY ${div.offsetTop / 20}`);
    // console.log(`Nx ${gridNumX} - Ny ${gridNumY}`);

    div.style.left = `${GRID_OFFSET + gridNumX * 20}px`;
    div.style.top = `${GRID_OFFSET + gridNumY * 20}px`;
});
