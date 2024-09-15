//HavokPhysics
import HavokPhysics from "@babylonjs/havok";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";

import {
    PhysicsAggregate,
    PhysicsShapeType
} from '@babylonjs/core' 

import CreateScene from "./CreateScene";

class Physics extends CreateScene{

    getInitializeHavok = async () => {
        try {
            const havok = await HavokPhysics(
                {
                    locateFile: (file) => {
                        return "../src/assets/HavokPhysics.wasm"
                    }
                }
            );
            return havok;
        } catch (error) {
            console.error("Erro ao inicializar o Havok:", error);
        }
    };

    async havokPlugin(havokInstance)
    {
        return await new HavokPlugin(true, havokInstance);
    }

}

export default Physics
