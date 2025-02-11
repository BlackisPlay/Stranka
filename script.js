window.onload = function () {
    let koso0 = document.getElementById("koso0");
    let koso1 = document.getElementById("koso1");
    document.getElementById("menu").style.top = "0px";
    document.getElementById("threeD").style.scale = 1;
    document.getElementById("threeD").style.opacity = 1;
    document.getElementById("threeD").style.transform = "translateX(0px)";
    koso0.style.top = "20px";
    koso1.style.top = "20px";
    koso0.style.left = (window.innerWidth / 2) - 70 + "px";
    koso1.style.right = (window.innerWidth / 2) - 70 + "px";
    document.getElementById("scrollButton").style.bottom = "30px";

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
        model.scale.set(1.6, 2.5, 2);
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

    setTimeout(() => {
        document.getElementById("podnadpis").innerHTML = "3D !o#e D@mu";
        setTimeout(() => {
            document.getElementById("podnadpis").innerHTML = "3D M#d#l Domu";
            setTimeout(() => {
                document.getElementById("podnadpis").innerHTML = "3D Model Domu";
                
            }, 100);
        }, 100);
    }, 100);
};

let scrollButton = document.getElementById("scrollButton");

window.addEventListener("scroll", () => {
    if(window.scrollY <= 100){
        document.getElementById("threeD").style.filter = "blur(0px)";
        document.getElementById("threeD").style.scale = 1;
        document.getElementById("podnadpis").style.filter = "blur(0px)";
        document.getElementById("podnadpis").style.scale = 1;
        document.getElementById("triangle").style.borderTop = "10px solid black";
        document.getElementById("triangle").style.borderBottom = "0px solid black";
    }else{
        document.getElementById("triangle").style.borderBottom = "10px solid black";
        document.getElementById("triangle").style.borderTop = "0px solid black";
        document.getElementById("threeD").style.filter = "blur(10px)";
        document.getElementById("threeD").style.scale = 0.8;
        document.getElementById("podnadpis").style.filter = "blur(10px)";
        document.getElementById("podnadpis").style.scale = 0.8;
    }
    
});

document.getElementById("scrollButton").addEventListener("click", () => {
    window.scrollTo(0, window.scrollY > 100 ? 0 : 600);
    if(window.scrollY <= 100){
        document.getElementById("scrollButton").style.setProperty('--move', '30px');
    }else document.getElementById("scrollButton").style.setProperty('--move', '-5px');
});
