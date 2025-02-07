window.onload = function () {
    let licho0 = document.getElementById("licho0");
    let licho1 = document.getElementById("licho1");

    licho0.style.left = (window.innerWidth / 2) - 70 + "px";
    licho1.style.right = (window.innerWidth / 2) - 70 + "px";

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const container = document.getElementById("threeD");

    // Ensure the container exists before using it
    if (!container) {
        console.error("Error: model-container div not found!");
        return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambientLight);

    // Load the house model
    const loader = new THREE.GLTFLoader();
    let model;
    loader.load("house.glb", function(gltf) {
        model = gltf.scene;
        model.scale.set(2, 2, 2);
        model.position.set(0, -1, 0);
        scene.add(model);
        animate();
    }, undefined, function(error) {
        console.error("Error loading model:", error);
    });

    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        if (model) model.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
};

let scrollButton = document.getElementById("scrollButton");

window.addEventListener("scroll", function() {
    if(window.scrollY == 0){
        scrollButton.style.bottom = "30px";
        scrollButton.style.backgroundColor = "white";
        scrollButton.style.setProperty('--background-color', 'white');
        scrollButton.style.color = "black";
        scrollButton.style.letterSpacing = "2px";
    }else{
        scrollButton.style.bottom = "-50px";
    }
    
});

document.getElementById("scrollButton").addEventListener("click", function() {
    scrollButton.style.backgroundColor = "black";
    scrollButton.style.setProperty('--background-color', 'black');
    scrollButton.style.color = "white";
    scrollButton.style.letterSpacing = "5px";
        scrollButton.style.bottom = "-50px";
        window.scrollTo(0, 300);
});