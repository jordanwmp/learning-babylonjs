import {
    MeshBuilder,
    Vector3,
    PhysicsAggregate,
    PhysicsShapeType,
    PhysicsBody,
    PhysicsMotionType,
    PhysicsShapeSphere,
    PhysicsShapeBox,
    Quaternion
} from '@babylonjs/core';

import CreateScene from "./src/CreateScene";
import Physics from './src/Physics';

const canvas = document.getElementById('renderCanvas');

const scene = new CreateScene(canvas)
await scene.initScene()
await scene.renderScene()

const physics = new Physics()
//createScene.testeMesh()

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

/*const sphere = new MeshBuilder.CreateSphere(

    "sphere", { diameter: 2, segments: 32 },
    scene.scene
)

sphere.position.y = 4



// Adicione os objetos de física após a inicialização do plugin
const sphereAggregate = new PhysicsAggregate(
    sphere,
    PhysicsShapeType.SPHERE,
    {
        mass: 1, restitution: 0.75
    },
    scene.scene
);

*/

const ground = new MeshBuilder.CreateGround(
    "ground",
    { width: 10, height: 10 },
    scene.scene
)

/*const groundAggregate = new PhysicsAggregate(
    ground,
    PhysicsShapeType.BOX,
    {
        mass: 0,
        restitution: 1
    },
    scene.scene
);*/

const groundBody = new PhysicsBody(
    ground,
    PhysicsShapeType.STATIC,
    true, 
    scene.scene
)

const groundMaterial = {friction: 0.2, restitution: 0.3};

const groundShape = new PhysicsShapeBox(
    new Vector3(0, 0, 0),
    Quaternion.Identity(),
    new Vector3(10, 0.1, 10),
    scene.scene
);

groundShape.material = (groundMaterial);
groundBody.shape = (groundShape);
groundBody.setMassProperties({
    mass: 0,
});

groundBody.setMassProperties({
    mass: 1,
    restitution: 0
})

const sphere = new MeshBuilder.CreateSphere("sphere")
sphere.position.y = 3

//sphere.thinInstanceAddSelf()

const sphereBody = new PhysicsBody(
    sphere, 
    PhysicsMotionType.DYNAMIC,
    false, 
    scene.scene
)

sphereBody.setMassProperties({
    mass: 1
})

/*sphereBody.applyForce(
    new Vector3(5, 0, 0),
    new Vector3(0,0,0)
)*/

const shape = new PhysicsShapeSphere(
    new Vector3(0,0,0),
    1,
    scene.scene
)

sphereBody.shape = shape
