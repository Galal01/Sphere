import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap";
import './style.css';


const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3,64,64); 
const material = new THREE.MeshStandardMaterial({
    color : '#00ff83',
    roughness: .2,
});

const mesh = new THREE.Mesh(geometry, material); 
scene.add(mesh); 

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

const size={  
    width: window.innerWidth,
    hieght: window.innerHeight
};


const camera= new THREE.PerspectiveCamera(45, 
    size.width / size.hieght, .1, 100) ;

camera.position.z = 20; 
scene.add(camera); 



const canvas= document.querySelector(".webgl");
const renderer= new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.hieght); 
renderer.setPixelRatio(2); 
renderer.render(scene, camera);

const control = new OrbitControls(camera, canvas);
control.enableDamping= true; 
control.enablePan= false; 
control.enableZoom= false; 
control.autoRotate= true; 
control.autoRotateSpeed= 5; 

window.addEventListener('resize', ()=> { 
    size.width= window.innerWidth;
    size.hieght= window.innerHeight;
    camera.aspect= size.width/size.hieght;
    camera.updateProjectionMatrix(); 
    renderer.setSize(size.width, size.hieght);
});


const loop = () =>{
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
    control.update(); 
};
loop();


const t= gsap.timeline({defaults: {duration:1}}); 
t.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1}); 
t.fromTo('nav', {y: "-100%"},{y: "0%"}); 
t.fromTo('.title', {opacity: 0}, {opacity: 1});


let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => (mouseDown=true));
window.addEventListener('mouseup', () => (mouseDown=false));

window.addEventListener("mousemove", function(e) {
    if (mouseDown){
        rgb=[
            Math.round((e.pageX /size.width)*255), 
            Math.round((e.pageY /size.hieght)*255), 
            100,]
        let newColor = new THREE.Color(`rgb(${rgb.join(',')})`); 
        gsap.to(mesh.material.color, {
            r: newColor.r,
            g: newColor.g,
            b: newColor.b,
        })
    }
})

