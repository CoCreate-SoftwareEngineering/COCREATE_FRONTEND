import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import getStroke from "perfect-freehand";
import { Tldraw, TDDocument } from "tldraw";
import "tldraw/tldraw.css";

// Create a RoughJS generator instance
const generator = rough.generator();

// Board Component: Handles collaborative drawing on canvas
const Canvas = ({
	tool,
	socket,
	elements,
	setElements,
	socketEmitElements,
}) => {
	// State for managing drawing elements and interactions
	// const [elements, setElements] = useState([]);
	const [action, setAction] = useState("none");
	// const [tool, setTool] = useState("line");
	const [selectedElement, setSelectedElement] = useState(null);
	// const [socket, setSocket] = useState(null);

	// useEffect(() => {
	// 	socket.on("servedElements", (elementsCopy) => {
	// 		console.log("recieved elements");
	// 		console.log(elementsCopy);
	// 		setElements(elementsCopy.canvasElementsGlobal);
	// 	});

	// 	socket.on("JOINED", () => console.log("WORKING"));

	// 	// Clean up the socket connection when the component is unmounted
	// 	return () => {
	// 		socket.disconnect();
	// 	};
	// }, [socket]);

	// UseLayoutEffect: Responsible for rendering drawing elements
	useLayoutEffect(() => {
		// Get the canvas element by its ID
		const canvas = document.getElementById("canvas");

		// Get the 2D rendering context of the canvas
		const ctx = canvas.getContext("2d");

		// Create a RoughJS canvas instance associated with the canvas element
		const roughCanvas = rough.canvas(canvas);

		// Clear the entire canvas to ensure a clean drawing surface
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// If there are saved elements to render
		if (elements && elements.length > 0) {
			// Iterate through each saved element
			elements.forEach(({ roughElement }) => {
				// Use RoughJS to draw the element on the canvas
				roughCanvas.draw(roughElement);
			});
		}
	}, [elements]);

	// Function to create a new drawing element
	const createElement = (id, x1, y1, x2, y2, elementType) => {
		let roughElement;
		// Use the RoughJS generator to create a rough element (line or rectangle)
		if (elementType === "line") {
			roughElement = generator.line(x1, y1, x2, y2);
		} else if (elementType === "rect") {
			roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
		}

		// Return an object representing the element, including its coordinates and RoughJS representation
		return { id, elementType, x1, y1, x2, y2, roughElement };
	};

	const distance = (a, b) =>
		Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

	const getElementAtPosition = (x, y) => {
		return elements.find((element) => {
			const { elementType, x1, y1, x2, y2 } = element;
			if (elementType === "rect") {
				const minX = Math.min(x1, x2);
				const maxX = Math.max(x1, x2);
				const minY = Math.min(y1, y2);
				const maxY = Math.max(y1, y2);
				return x >= minX && x <= maxX && y >= minY && y <= maxY;
			} else {
				const a = { x: x1, y: y1 };
				const b = { x: x2, y: y2 };
				const c = { x, y };
				const offset = distance(a, b) - (distance(a, c) + distance(b, c));
				return Math.abs(offset) < 1;
			}
		});
	};

	// Event handler for mouse down
	const handleMouseDown = (e) => {
		const { clientX, clientY } = e;
		if (tool === "selection") {
			const element = getElementAtPosition(clientX, clientY);
			if (element) {
				const offsetX = clientX - element.x1;
				const offsetY = clientY - element.y1;
				setSelectedElement({ ...element, offsetX, offsetY });
				setAction("moving");
			}
		} else {
			const { clientX, clientY } = e;
			const id = elements.length;
			// Create a new drawing element when mouse down is detected
			const element = createElement(
				id,
				clientX,
				clientY,
				clientX,
				clientY,
				tool
			);
			setElements((prevState) => [...prevState, element]);
			setAction("drawing");
		}
	};

	const updateElement = (id, x1, y1, x2, y2, tool) => {
		const UpdatedElement = createElement(id, x1, y1, x2, y2, tool);

		const elementsCopy = [...elements];
		elementsCopy[id] = UpdatedElement;
		setElements(elementsCopy);
	};

	// Event handler for mouse move
	const handleMouseMove = (e) => {
		const { clientX, clientY } = e;

		if (tool === "selection") {
			e.target.style.cursor = getElementAtPosition(clientX, clientY, elements)
				? "move"
				: "default";
		}

		if (action === "drawing") {
			// Find the index of the last element created during mouse down
			const index = elements.length - 1;
			const { x1, y1 } = elements[index];
			// Update the element's coordinates for dynamic drawing
			updateElement(index, x1, y1, clientX, clientY, tool);
		} else if (action === "moving") {
			const { id, x1, x2, y1, y2, elementType, offsetX, offsetY } =
				selectedElement;
			const width = x2 - x1;
			const height = y2 - y1;
			const newX = clientX - offsetX;
			const newY = clientY - offsetY;
			updateElement(id, newX, newY, newX + width, newY + height, elementType);
		}
	};

	// Event handler for mouse up
	const handleMouseUp = () => {
		setAction("none");
		setSelectedElement(null);
		socketEmitElements(elements);
		console.log("Elements Emitted");
	};

	return (
		<div className="canvas-container">
			<canvas
				id="canvas"
				width={window.innerWidth}
				height={window.innerHeight}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				className="canvas"
			></canvas>
		</div>
	);
};

export default Canvas;
