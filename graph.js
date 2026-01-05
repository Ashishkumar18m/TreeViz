
// Global variables
let selectedAlgorithm = null;
let nodes = [];
let edges = [];
let nodeValues = {};
let currentStep = 0;
let traversalSteps = [];
let isLinking = false;
let startNode = null;
let autoPlayInterval = null;
let selectedStartNode = null;
let finalTraversalOrder = [];

// Canvas setup
const drawingCanvas = document.getElementById('drawingCanvas');
const visCanvas = document.getElementById('visCanvas');
const drawingCtx = drawingCanvas.getContext('2d');
const visCtx = visCanvas.getContext('2d');

// Set canvas dimensions
function resizeCanvases() {
    drawingCanvas.width = drawingCanvas.parentElement.clientWidth;
    drawingCanvas.height = drawingCanvas.parentElement.clientHeight;
    visCanvas.width = visCanvas.parentElement.clientWidth;
    visCanvas.height = visCanvas.parentElement.clientHeight;
    redrawDrawingCanvas();
    drawVisualization();
}

        // ===============================
                // Help Modal Functions
        function showHelpModal() {
            document.getElementById('helpModal').style.display = 'flex';
        }
        
        function closeHelpModal() {
            document.getElementById('helpModal').style.display = 'none';
        }
        
        // Close modal when clicking outside
        document.addEventListener('DOMContentLoaded', function() {
            const modal = document.getElementById('helpModal');
            if (modal) {
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        closeHelpModal();
                    }
                });
                
                // Close with Escape key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape' && modal.style.display === 'flex') {
                        closeHelpModal();
                    }
                });
            }
        });


// DOM Elements
const bfsBtn = document.getElementById('bfsBtn');
const dfsBtn = document.getElementById('dfsBtn');
const selectedAlgorithmSpan = document.getElementById('selectedAlgorithm');
const clearBtn = document.getElementById('clearBtn');
const sampleTreeBtn = document.getElementById('sampleTreeBtn');
const sampleGraphBtn = document.getElementById('sampleGraphBtn');
const applyValuesBtn = document.getElementById('applyValuesBtn');
const visualizeBtn = document.getElementById('visualizeBtn');
const resetVisBtn = document.getElementById('resetVisBtn');
const prevStepBtn = document.getElementById('prevStepBtn');
const nextStepBtn = document.getElementById('nextStepBtn');
const autoPlayBtn = document.getElementById('autoPlayBtn');
const stepDetails = document.getElementById('stepDetails');
const nodeInputsContainer = document.getElementById('nodeInputsContainer');
const instructionModal = document.getElementById('instructionModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const startNodeSelect = document.getElementById('startNodeSelect');

// Initialize
window.addEventListener('load', () => {
    resizeCanvases();
    instructionModal.style.display = 'flex';
});

window.addEventListener('resize', resizeCanvases);

// Event Listeners
bfsBtn.addEventListener('click', () => {
    selectedAlgorithm = 'BFS';
    selectedAlgorithmSpan.textContent = 'Breadth-First Search';
    updateButtons();
    updateVisualizeButton();
});

dfsBtn.addEventListener('click', () => {
    selectedAlgorithm = 'DFS';
    selectedAlgorithmSpan.textContent = 'Depth-First Search';
    updateButtons();
    updateVisualizeButton();
});

clearBtn.addEventListener('click', () => {
    nodes = [];
    edges = [];
    nodeValues = {};
    currentStep = 0;
    traversalSteps = [];
    finalTraversalOrder = [];
    selectedStartNode = null;
    redrawDrawingCanvas();
    updateNodeInputs();
    updateStartNodeSelect();
    resetVisualization();
});

sampleTreeBtn.addEventListener('click', generateSampleTree);
sampleGraphBtn.addEventListener('click', generateSampleGraph);

applyValuesBtn.addEventListener('click', applyNodeValues);

visualizeBtn.addEventListener('click', startVisualization);

resetVisBtn.addEventListener('click', resetVisualization);

prevStepBtn.addEventListener('click', previousStep);

nextStepBtn.addEventListener('click', nextStep);

autoPlayBtn.addEventListener('click', toggleAutoPlay);

closeModalBtn.addEventListener('click', () => {
    instructionModal.style.display = 'none';
});

 helpBtn.addEventListener('click', showHelpModal);  // Changed from alert to modal
 
startNodeSelect.addEventListener('change', (e) => {
    selectedStartNode = e.target.value ? parseInt(e.target.value) : null;
    updateVisualizeButton();
});

// Drawing Canvas Events
drawingCanvas.addEventListener('mousedown', handleMouseDown);
drawingCanvas.addEventListener('mousemove', handleMouseMove);
drawingCanvas.addEventListener('mouseup', handleMouseUp);
drawingCanvas.addEventListener('contextmenu', handleRightClick);

function updateButtons() {
    bfsBtn.style.opacity = selectedAlgorithm === 'BFS' ? '1' : '0.6';
    dfsBtn.style.opacity = selectedAlgorithm === 'DFS' ? '1' : '0.6';
}

function updateVisualizeButton() {
    const hasAlgorithm = selectedAlgorithm !== null;
    const hasGraph = nodes.length > 0;
    const hasStartNode = selectedStartNode !== null;

    visualizeBtn.disabled = !(hasAlgorithm && hasGraph && hasStartNode);

    if (!hasAlgorithm) {
        visualizeBtn.title = "Please select an algorithm first";
    } else if (!hasGraph) {
        visualizeBtn.title = "Please draw a graph first";
    } else if (!hasStartNode) {
        visualizeBtn.title = "Please select a starting node";
    } else {
        visualizeBtn.title = "Start visualization";
    }
}

function generateSampleTree() {
    nodes = [];
    edges = [];
    nodeValues = {};
    selectedStartNode = null;

    // Create sample tree nodes
    const centerX = drawingCanvas.width / 2;
    const centerY = 100;

    // Tree structure (hierarchical)
    nodes.push({ id: 0, x: centerX, y: centerY });
    nodes.push({ id: 1, x: centerX - 120, y: centerY + 100 });
    nodes.push({ id: 2, x: centerX, y: centerY + 100 });
    nodes.push({ id: 3, x: centerX + 120, y: centerY + 100 });
    nodes.push({ id: 4, x: centerX - 150, y: centerY + 200 });
    nodes.push({ id: 5, x: centerX - 90, y: centerY + 200 });
    nodes.push({ id: 6, x: centerX + 90, y: centerY + 200 });
    nodes.push({ id: 7, x: centerX + 150, y: centerY + 200 });

    // Tree edges (no cycles)
    edges.push({ from: 0, to: 1 });
    edges.push({ from: 0, to: 2 });
    edges.push({ from: 0, to: 3 });
    edges.push({ from: 1, to: 4 });
    edges.push({ from: 1, to: 5 });
    edges.push({ from: 3, to: 6 });
    edges.push({ from: 3, to: 7 });

    // Assign default values
    nodes.forEach(node => {
        nodeValues[node.id] = String.fromCharCode(65 + node.id);
    });

    redrawDrawingCanvas();
    updateNodeInputs();
    updateStartNodeSelect();
    updateVisualizeButton();
}

function generateSampleGraph() {
    nodes = [];
    edges = [];
    nodeValues = {};
    selectedStartNode = null;

    // Create sample graph nodes (non-hierarchical layout)
    const centerX = drawingCanvas.width / 2;
    const centerY = drawingCanvas.height / 2;
    const radius = 120;

    // Create nodes in circular layout
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        nodes.push({ id: i, x, y });
        nodeValues[i] = String.fromCharCode(65 + i);
    }

    // Create edges (including cycles)
    edges.push({ from: 0, to: 1 });
    edges.push({ from: 0, to: 2 });
    edges.push({ from: 1, to: 3 });
    edges.push({ from: 1, to: 4 });
    edges.push({ from: 2, to: 5 });
    edges.push({ from: 3, to: 6 });
    edges.push({ from: 4, to: 6 });
    edges.push({ from: 5, to: 7 });
    edges.push({ from: 6, to: 7 });
    edges.push({ from: 7, to: 0 }); // Cycle

    redrawDrawingCanvas();
    updateNodeInputs();
    updateStartNodeSelect();
    updateVisualizeButton();
}

function updateStartNodeSelect() {
    startNodeSelect.innerHTML = '<option value="">-- Select a node --</option>';
    nodes.forEach(node => {
        const option = document.createElement('option');
        option.value = node.id;
        option.textContent = `Node ${node.id} (${nodeValues[node.id] || node.id})`;
        startNodeSelect.appendChild(option);
    });

    // Auto-select first node as default
    if (nodes.length > 0) {
        startNodeSelect.value = nodes[0].id;
        selectedStartNode = nodes[0].id;
        updateVisualizeButton();
    }
}

function handleMouseDown(e) {
    const rect = drawingCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on existing node
    const clickedNode = nodes.find(node =>
        Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2) < 20
    );

    if (e.button === 2) { // Right click
        if (clickedNode) {
            // Remove node and connected edges
            nodes = nodes.filter(node => node.id !== clickedNode.id);
            edges = edges.filter(edge =>
                edge.from !== clickedNode.id && edge.to !== clickedNode.id
            );
            delete nodeValues[clickedNode.id];
            redrawDrawingCanvas();
            updateNodeInputs();
            updateStartNodeSelect();
            updateVisualizeButton();
        }
        return;
    }

    if (clickedNode) {
        // Start linking nodes
        isLinking = true;
        startNode = clickedNode;
    } else {
        // Create new node
        const newNodeId = nodes.length > 0 ? Math.max(...nodes.map(n => n.id)) + 1 : 0;
        nodes.push({ id: newNodeId, x, y });
        nodeValues[newNodeId] = newNodeId.toString();
        redrawDrawingCanvas();
        updateNodeInputs();
        updateStartNodeSelect();
        updateVisualizeButton();
    }
}

function handleMouseMove(e) {
    if (!isLinking) return;

    const rect = drawingCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    redrawDrawingCanvas();

    // Draw temporary line
    drawingCtx.beginPath();
    drawingCtx.moveTo(startNode.x, startNode.y);
    drawingCtx.lineTo(x, y);
    drawingCtx.strokeStyle = '#ff0000';
    drawingCtx.lineWidth = 2;
    drawingCtx.stroke();
}

function handleMouseUp(e) {
    if (!isLinking || !startNode) {
        isLinking = false;
        startNode = null;
        return;
    }

    const rect = drawingCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const targetNode = nodes.find(node =>
        node.id !== startNode.id &&
        Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2) < 20
    );

    if (targetNode) {
        // Check if edge already exists
        const edgeExists = edges.some(edge =>
            (edge.from === startNode.id && edge.to === targetNode.id) ||
            (edge.from === targetNode.id && edge.to === startNode.id)
        );

        if (!edgeExists) {
            edges.push({ from: startNode.id, to: targetNode.id });
        }
    }

    isLinking = false;
    startNode = null;
    redrawDrawingCanvas();
    updateVisualizeButton();
}

function handleRightClick(e) {
    e.preventDefault();
}

function redrawDrawingCanvas() {
    drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

    // Draw edges
    edges.forEach(edge => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        if (fromNode && toNode) {
            drawingCtx.beginPath();
            drawingCtx.moveTo(fromNode.x, fromNode.y);
            drawingCtx.lineTo(toNode.x, toNode.y);
            drawingCtx.strokeStyle = '#333';
            drawingCtx.lineWidth = 2;
            drawingCtx.stroke();
        }
    });

    // Draw nodes
    nodes.forEach(node => {
        // Draw circle
        drawingCtx.beginPath();
        drawingCtx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        drawingCtx.fillStyle = node.id === selectedStartNode ? '#ffc107' : '#667eea';
        drawingCtx.fill();
        drawingCtx.strokeStyle = node.id === selectedStartNode ? '#ff9800' : '#764ba2';
        drawingCtx.lineWidth = 3;
        drawingCtx.stroke();

        // Draw node ID
        drawingCtx.fillStyle = 'white';
        drawingCtx.font = 'bold 14px Arial';
        drawingCtx.textAlign = 'center';
        drawingCtx.textBaseline = 'middle';

        let displayValue = nodeValues[node.id] || node.id.toString();
        if (displayValue.length > 3) {
            displayValue = displayValue.substring(0, 3);
        }
        drawingCtx.fillText(displayValue, node.x, node.y);
    });
}

function drawVisualization() {
    visCtx.clearRect(0, 0, visCanvas.width, visCanvas.height);

    // Calculate scale to fit all nodes
    const margin = 40;
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    nodes.forEach(node => {
        minX = Math.min(minX, node.x);
        maxX = Math.max(maxX, node.x);
        minY = Math.min(minY, node.y);
        maxY = Math.max(maxY, node.y);
    });

    const graphWidth = maxX - minX;
    const graphHeight = maxY - minY;
    const canvasWidth = visCanvas.width - 2 * margin;
    const canvasHeight = visCanvas.height - 2 * margin;

    // Calculate scale factor
    const scaleX = canvasWidth / graphWidth;
    const scaleY = canvasHeight / graphHeight;
    const scale = Math.min(scaleX, scaleY, 1.5); // Cap at 1.5x to prevent too much enlargement

    // Calculate offset to center the graph
    const offsetX = margin + (canvasWidth - graphWidth * scale) / 2;
    const offsetY = margin + (canvasHeight - graphHeight * scale) / 2;

    // Draw edges
    edges.forEach(edge => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        if (fromNode && toNode) {
            const x1 = (fromNode.x - minX) * scale + offsetX;
            const y1 = (fromNode.y - minY) * scale + offsetY;
            const x2 = (toNode.x - minX) * scale + offsetX;
            const y2 = (toNode.y - minY) * scale + offsetY;

            visCtx.beginPath();
            visCtx.moveTo(x1, y1);
            visCtx.lineTo(x2, y2);

            // Highlight edges connected to current/visited nodes
            const step = traversalSteps[currentStep];
            const isVisited = step?.visited?.has(edge.from) && step?.visited?.has(edge.to);
            const isCurrentEdge = (step?.node === edge.from || step?.node === edge.to) &&
                step?.visited?.has(edge.from) && step?.visited?.has(edge.to);

            if (isCurrentEdge) {
                visCtx.strokeStyle = '#FF5722';
                visCtx.lineWidth = 4;
            } else if (isVisited) {
                visCtx.strokeStyle = '#4CAF50';
                visCtx.lineWidth = 3;
            } else {
                visCtx.strokeStyle = '#333';
                visCtx.lineWidth = 2;
            }

            visCtx.stroke();
        }
    });

    // Draw nodes
    nodes.forEach(node => {
        const x = (node.x - minX) * scale + offsetX;
        const y = (node.y - minY) * scale + offsetY;

        const step = traversalSteps[currentStep];
        const isVisited = step?.visited?.has(node.id);
        const isCurrent = step?.node === node.id;
        const nodeRadius = 22;

        // Draw shadow for visited/current nodes
        if (isCurrent || isVisited) {
            visCtx.beginPath();
            visCtx.arc(x, y + 2, nodeRadius, 0, Math.PI * 2);
            visCtx.fillStyle = 'rgba(0,0,0,0.2)';
            visCtx.fill();
        }

        // Draw node
        visCtx.beginPath();
        visCtx.arc(x, y, nodeRadius, 0, Math.PI * 2);

        if (isCurrent) {
            visCtx.fillStyle = '#FF5722';
            visCtx.strokeStyle = '#D84315';
        } else if (isVisited) {
            visCtx.fillStyle = '#4CAF50';
            visCtx.strokeStyle = '#388E3C';
        } else if (node.id === selectedStartNode) {
            visCtx.fillStyle = '#FFC107';
            visCtx.strokeStyle = '#FF9800';
        } else {
            visCtx.fillStyle = '#667eea';
            visCtx.strokeStyle = '#764ba2';
        }

        visCtx.fill();
        visCtx.lineWidth = 3;
        visCtx.stroke();

        // Draw node value
        visCtx.fillStyle = isCurrent || isVisited ? 'white' : 'white';
        visCtx.font = 'bold 14px Arial';
        visCtx.textAlign = 'center';
        visCtx.textBaseline = 'middle';

        let displayValue = nodeValues[node.id] || node.id.toString();
        if (displayValue.length > 3) {
            displayValue = displayValue.substring(0, 3);
        }
        visCtx.fillText(displayValue, x, y);

        // Draw node ID in smaller font
        visCtx.fillStyle = 'rgba(0,0,0,0.6)';
        visCtx.font = '10px Arial';
        visCtx.fillText(`ID:${node.id}`, x, y + 25);
    });
}

function updateNodeInputs() {
    nodeInputsContainer.innerHTML = '';
    nodes.sort((a, b) => a.id - b.id).forEach(node => {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'node-input';
        inputDiv.innerHTML = `
                    <div class="node-circle" style="background-color: ${node.id === selectedStartNode ? '#ffc107' : '#667eea'}">${node.id}</div>
                    <input type="text" value="${nodeValues[node.id] || ''}" 
                           data-node-id="${node.id}" 
                           placeholder="Value">
                `;
        nodeInputsContainer.appendChild(inputDiv);
    });
}

function applyNodeValues() {
    const inputs = document.querySelectorAll('.node-input input');
    inputs.forEach(input => {
        const nodeId = parseInt(input.dataset.nodeId);
        const value = input.value.trim();
        if (value) {
            nodeValues[nodeId] = value;
        } else {
            nodeValues[nodeId] = nodeId.toString();
        }
    });
    updateStartNodeSelect();
    alert('Node values applied successfully!');
}

function startVisualization() {
    if (!selectedAlgorithm) {
        alert('Please select an algorithm first!');
        return;
    }

    if (nodes.length === 0) {
        alert('Please draw a graph first!');
        return;
    }

    if (selectedStartNode === null) {
        alert('Please select a starting node!');
        return;
    }

    // Perform traversal from selected node
    if (selectedAlgorithm === 'BFS') {
        traversalSteps = bfsTraversal(selectedStartNode);
    } else {
        traversalSteps = dfsTraversal(selectedStartNode);
    }

    // Extract final traversal order
    finalTraversalOrder = [...(traversalSteps[traversalSteps.length - 1]?.visited || [])];

    currentStep = 0;
    updateStepControls();
    updateStepDisplay();
    drawVisualization();
}

function bfsTraversal(startId) {
    const steps = [];
    const visited = new Set();
    const queue = [startId];
    visited.add(startId);

    steps.push({
        node: startId,
        visited: new Set(visited),
        queue: [...queue],
        action: `Start BFS from node ${nodeValues[startId] || startId}`
    });

    while (queue.length > 0) {
        const current = queue.shift();
        const neighbors = getNeighbors(current).filter(neighbor => !visited.has(neighbor));

        neighbors.forEach(neighbor => {
            visited.add(neighbor);
            queue.push(neighbor);

            steps.push({
                node: neighbor,
                visited: new Set(visited),
                queue: [...queue],
                action: `Visit ${nodeValues[neighbor] || neighbor} (neighbor of ${nodeValues[current] || current})`
            });
        });

        if (neighbors.length === 0 && queue.length > 0) {
            steps.push({
                node: queue[0],
                visited: new Set(visited),
                queue: [...queue],
                action: `Move to next in queue: ${nodeValues[queue[0]] || queue[0]}`
            });
        }
    }

    steps.push({
        node: null,
        visited: new Set(visited),
        queue: [],
        action: `BFS Complete! Visited ${visited.size} nodes.`
    });

    return steps;
}

function dfsTraversal(startId) {
    const steps = [];
    const visited = new Set();
    const stack = [startId];

    function dfs(current) {
        if (visited.has(current)) return;

        visited.add(current);
        steps.push({
            node: current,
            visited: new Set(visited),
            stack: [...stack],
            action: `Visit ${nodeValues[current] || current}`
        });

        const neighbors = getNeighbors(current).filter(neighbor => !visited.has(neighbor));

        neighbors.forEach(neighbor => {
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
                dfs(neighbor);
                stack.pop();
            }
        });
    }

    dfs(startId);

    steps.push({
        node: null,
        visited: new Set(visited),
        stack: [],
        action: `DFS Complete! Visited ${visited.size} nodes.`
    });

    return steps;
}

function getNeighbors(nodeId) {
    return edges
        .filter(edge => edge.from === nodeId || edge.to === nodeId)
        .map(edge => edge.from === nodeId ? edge.to : edge.from)
        .sort((a, b) => a - b);
}

function updateStepDisplay() {
    if (currentStep >= traversalSteps.length) {
        // Show final result
        let html = `<p><strong>Visualization complete!</strong></p>`;
        html += `<p>Traversal visited ${traversalSteps[traversalSteps.length - 1]?.visited?.size || 0} nodes.</p>`;

        html += `<div class="final-traversal">`;
        html += `<h4>Final ${selectedAlgorithm} Traversal Order:</h4>`;
        html += `<p>${finalTraversalOrder.map(id =>
            `<span class="highlight">${nodeValues[id] || id}</span>`
        ).join(' → ')}</p>`;

        // Show node details
        html += `<p><strong>Node Details:</strong><br>`;
        finalTraversalOrder.forEach(id => {
            html += `Node ${id} = ${nodeValues[id] || id}<br>`;
        });
        html += `</p></div>`;

        stepDetails.innerHTML = html;
        return;
    }

    const step = traversalSteps[currentStep];
    let html = `<p><strong>Step ${currentStep + 1}/${traversalSteps.length}:</strong> ${step.action}</p>`;

    if (selectedAlgorithm === 'BFS') {
        html += `<p>Queue: [${step.queue?.map(id =>
            `<span class="${step.node === id ? 'current-node' : ''}">${nodeValues[id] || id}</span>`
        ).join(', ') || 'Empty'}]</p>`;
    } else {
        html += `<p>Stack: [${step.stack?.map(id =>
            `<span class="${step.node === id ? 'current-node' : ''}">${nodeValues[id] || id}</span>`
        ).join(', ') || 'Empty'}]</p>`;
    }

    html += `<p>Visited: {${[...step.visited].map(id =>
        `<span class="${step.node === id ? 'current-node' : ''}">${nodeValues[id] || id}</span>`
    ).join(', ')}}</p>`;

    stepDetails.innerHTML = html;
    drawVisualization();
}

function updateStepControls() {
    prevStepBtn.disabled = currentStep === 0;
    nextStepBtn.disabled = currentStep >= traversalSteps.length - 1;
    autoPlayBtn.disabled = traversalSteps.length === 0;

    if (traversalSteps.length > 0) {
        prevStepBtn.disabled = false;
        nextStepBtn.disabled = false;
        autoPlayBtn.disabled = false;
    }
}

function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        updateStepControls();
        updateStepDisplay();
    }
}

function nextStep() {
    if (currentStep < traversalSteps.length - 1) {
        currentStep++;
        updateStepControls();
        updateStepDisplay();
    }
}

function toggleAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        autoPlayBtn.textContent = 'Auto Play';
        autoPlayBtn.classList.remove('btn-warning');
        autoPlayBtn.classList.add('btn-success');
    } else {
        autoPlayBtn.textContent = 'Stop';
        autoPlayBtn.classList.remove('btn-success');
        autoPlayBtn.classList.add('btn-warning');
        autoPlayInterval = setInterval(() => {
            if (currentStep < traversalSteps.length - 1) {
                nextStep();
            } else {
                toggleAutoPlay();
            }
        }, 1500);
    }
}

function resetVisualization() {
    currentStep = 0;
    traversalSteps = [];
    finalTraversalOrder = [];
    stepDetails.innerHTML = 'Select an algorithm, draw a graph, choose starting node, then click "Start Visualization"';
    drawVisualization();

    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        autoPlayBtn.textContent = 'Auto Play';
        autoPlayBtn.classList.remove('btn-warning');
        autoPlayBtn.classList.add('btn-success');
    }

    updateStepControls();
}