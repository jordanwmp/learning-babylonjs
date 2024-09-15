import { Engine, Scene, FreeCamera, HemisphericLight, Vector3, MeshBuilder } from "@babylonjs/core"

class CreateScene{
    
    engine
    scene
    camera
    light
    canvas

    constructor(canvas){
        this.canvas = canvas
    }

    async initScene()
    {
        this.engine = new Engine(this.canvas)
        this.scene = new Scene(this.engine)
        this.camera = new FreeCamera("freeCamera", new Vector3(0, 5, -10), this.scene)
        this.camera.setTarget(new Vector3(0, 0, 0))
        this.camera.attachControl(this.canvas, true)

        this.light = new HemisphericLight("light1", new Vector3(0,1,0), this.scene)
    }

    async renderScene()
    {
        window.addEventListener('resize', ()=>{
            this.engine.resize()
        })

        this.engine.runRenderLoop(()=>{
            this.scene.render()
        })
    }

    testeMesh() {
        const box = new MeshBuilder.CreateBox("box", { width: 2, height: 2, depth: 2 }, this.scene)
    }
}

export default CreateScene