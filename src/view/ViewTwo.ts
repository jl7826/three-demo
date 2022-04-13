import { AmbientLight, Clock, Material, Mesh, MeshPhongMaterial, PointLight, SphereGeometry, WebGLRenderer, MeshBasicMaterial, MeshMatcapMaterial, TextureLoader } from "three";
import { lerp3D } from "../utils";
import { BaseView } from "./BaseView";
import gsap from 'gsap'
// Try pushing out font assests 
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export class ViewTwo extends BaseView {

	spheres: Array<Mesh>;
	tl: any;
	lightPoint: PointLight;
	lightAmbient: AmbientLight;

	constructor(model: any, renderer: WebGLRenderer) {
		super(model, renderer)

		this.spheres = []

		this.tl = gsap.timeline()

		const textureLoader = new TextureLoader()
		const matcapTexture = textureLoader.load('../../resources/textures/7.png')

		const fontLoader = new FontLoader()

		fontLoader.load(
			'../../resources/fonts/ArcadeClassic_Regular.json',
			(font) => 
			{
				const textGeometry = new TextGeometry(
					'Hello World',
					{
						font: font,
						size: 0.5,
						height: 0.2,
						// reduce triangles (optimization)
						curveSegments: 5,
						bevelEnabled: true,
						bevelThickness: 0.03,
						bevelSize: 0.02,			
						bevelOffset: 0,				
						// reduce bevel triangles (optimization)				
						bevelSegments: 3
					}
				)
				textGeometry.center()
				const textMaterial = new MeshMatcapMaterial({matcap: matcapTexture})
				const text = new Mesh(textGeometry, textMaterial)
				this.scene.add(text)

			}
		)

		const sphereGeometry = new SphereGeometry(0.5);
		
		for (let i = 0; i < 10; i++) {
			const sphereMaterial = new MeshPhongMaterial()
			const tempSphere = new Mesh(sphereGeometry, sphereMaterial);

			// Try to make a gui button that triggers new set of random colors
			// tempSphere.material.color.set( Math.random() * 0xffffff )

			this.tl.to(tempSphere.position,
				{ 
					x: Math.cos((i/10) * Math.PI * 2) * 3,
					y: Math.sin((i/10) * Math.PI * 2) * 3 , 
					duration: 2,
					ease: 'bounce.out'
				}, `${i/4}`)

			this.tl.fromTo(tempSphere.scale, {x:0,y:0}, {x:1,y:1,duration: 2, ease: 'expo.out'}, "<") 

			this.tl.to(tempSphere.material.color, 
				{
					r: Math.random(),
					g: Math.random(),
					b: Math.random(),
					duration: 2,
				}, "<")

			this.spheres.push(tempSphere)
			this.scene.add(tempSphere)
		}

		// All spheres shrink at the same time
		this.tl.addLabel("returnLabel") // it's like a timestamp
		this.spheres.forEach((sphere: Mesh, i: number)=> 
		{
			this.tl
			.to(sphere.scale,
				{
					x : 0,
					y : 0,
					z: 0
				}, "returnLabel" + `${i/4}`) // all happen at the same time mark
			.to(sphere.position,
				{
					x : 0,
					y : 0,
					z: 0
				}, "returnLabel" + `${i/4}`)
		})

		// const sphereGeometry = new SphereGeometry();
		// const sphereMaterial = new MeshPhongMaterial({color: 0x32cd43})
		// this.sphere = new Mesh(sphereGeometry, sphereMaterial)

		// this.scene.add(this.sphere)

		this.lightPoint = new PointLight(0xcccccc);
		this.lightPoint.intensity = 0.66;
		this.lightPoint.position.set(-5, 3, 4);

		const mapSize = 1024; // Default 512
		const cameraNear = 0.5; // Default 0.5
		const cameraFar = 500; // Default 500
		this.lightPoint.shadow.mapSize.width = mapSize;
		this.lightPoint.shadow.mapSize.height = mapSize;
		this.lightPoint.shadow.camera.near = cameraNear;
		this.lightPoint.shadow.camera.far = cameraFar;

		this.scene.add(this.lightPoint);

		this.lightAmbient = new AmbientLight(0xffffff);
		this.lightAmbient.intensity = 0.5;

		this.scene.add(this.lightAmbient);
	}

	//@ts-ignore
	update(clock: Clock): void {

		const time = clock.getElapsedTime()

		// Multiply by 2 for a wider range or greater amplitude
		// this.sphere.position.x = Math.cos(time) * 2
		// this.sphere.position.y = Math.sin(time) * 2
		// // this.sphere.position.z = Math.sin(time * 4) * 2
		// this.sphere.position.z = Math.sin(time / 4) * 2

		// // Spiraling Down
		// this.sphere.position.x = Math.cos(time) * 2
		// this.sphere.position.y = Math.sin(time / 4) * 2
		// this.sphere.position.z = Math.sin(time) * 2;

		// // Cycling through different colors
		// (this.sphere.material as MeshPhongMaterial).color.set(Math.sin(time)*0xffffff)

		// console.log(this.model.pointerPosition)

		// What was this????
		// const targetPos = lerp3D(this.sphere.position, new Vector3(this.model.pointerPosition.x*3, this.model.pointerPosition.y*3, 0), 0.01);
		// // console.log(targetPos)
		// this.sphere.position.set(targetPos.x, targetPos.y, targetPos.z)

	}
}                                                                                                                                                                                                                                                                                                    