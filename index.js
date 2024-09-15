import {
    MeshBuilder,
    Vector3,
    PhysicsAggregate,
    PhysicsShapeType
} from '@babylonjs/core';

import CreateScene from "./src/CreateScene";
import Physics from './src/Physics';

const canvas = document.getElementById('renderCanvas');

const scene = new CreateScene(canvas)
await scene.initScene()
await scene.renderScene()

const physics = new Physics()
//createScene.testeMesh()

const sphere = new MeshBuilder.CreateSphere(
    "sphere", { diameter: 2, segments: 32 },
    scene.scene
)

sphere.position.y = 4

const ground = new MeshBuilder.CreateGround(
    "ground",
    { width: 10, height: 10 },
    scene.scene
)

// Inicialize o Havok e configure a física
const initializePhysics = async () => {
    
    const havokInstance = await physics.getInitializeHavok();

    if (havokInstance) {

        const hk = await physics.havokPlugin(havokInstance);
        const gravity = new Vector3(0, -9.81, 0);
        scene.scene.enablePhysics(gravity, hk);
    }

}

await initializePhysics();

// Adicione os objetos de física após a inicialização do plugin
const sphereAggregate = new PhysicsAggregate(
    sphere,
    PhysicsShapeType.SPHERE,
    {
        mass: 1, restitution: 0.75
    },
    scene.scene
);

const groundAggregate = new PhysicsAggregate(
    ground,
    PhysicsShapeType.BOX,
    {
        mass: 0
    },
    scene.scene
);