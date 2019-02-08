city.star_play = {
    buildings: [],
    caps: 0,
    nb_building: 0,
    field: {
        width: 500,
        height: 2500
    },

    speed: null,
    cam: null,
    init: function (config) {
        config = config || {};



        this.speed = config.speed || 1
        this.nb_building = config.nb_building || 50;
        this.cam = city.engine.camera
        const scene = city.engine.scene;
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

        // --- Light

        const homni = new THREE.HemisphereLight(0xffffff, 0x444444);
        homni.position.set(0, 200, 0);
        scene.add(homni);

        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 200, 100);
        light.castShadow = true;
        scene.add(light);


        // --- Ground

        let material_plane = new THREE.MeshBasicMaterial({ color: 0xffffff });

        //Plane
        let plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 2500), material_plane);
        plane.position.set(0, -10, -100);
        plane.rotateX(THREE.Math.degToRad(-90));
        //On ajoute la surface à la caméra :
        city.engine.camera.add(plane);

        // --- skybox
        const path = "assets/sand/";
        const format = '.png';
        const urls = [
            path + 'right' + format, path + 'left' + format,
            path + 'top' + format, path + 'bottom' + format,
            path + 'back' + format, path + 'front' + format
        ];
        const textureCube = new THREE.CubeTextureLoader().load(urls);
        textureCube.format = THREE.RGBFormat;

        let scene_cube = new THREE.Scene();
        scene_cube.background = textureCube;






        // load model

        const loader = new THREE.OBJLoader();
        loader.load('assets/source/Building.obj', function (building) {
            city.star_play.build_city(building);
        });

        const loaderbText = new THREE.MTLLoader();
        loaderbText.load('assets/source/Building.mtl', function (building) {
            city.star_play.build_texture(building);
        });

        /*const loaderOBJ = new THREE.OBJLoader();
        loaderOBJ.load('assets/source/nassim_final.obj', function (vaisseau) {*/
            //city.star_play.build_vaisseau();
            
        const geometry = new THREE.ConeBufferGeometry( 5, 20, 32 );
            const material2 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
            const cone = new THREE.Mesh( geometry, material2 );
            cone.position.set(1, 1, -10);
            cone.rotateX(THREE.Math.degToRad(-90));
            cone.scale.set(0.02, 0.02, 0.02);
            city.engine.camera.add(cone);
            
            
            //city.star_play.caps.rotateY(THREE.Math.degToRad(180));
            //city.star_play.caps.scale.set(0.02, 0.02, 0.02);
            //city.engine.scene.add(city.star_play.caps);
            //city.engine.camera.add(city.star_play.caps);
            console.log("cone added !");

            city.star_play.traverse = (function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        

        const loaderMTL = new THREE.MTLLoader();
        loaderMTL.load('assets/source/nassim_final.mtl', function (texture) {
            city.star_play.vaisseau_texture(texture);
        });

        const onKeyDown = function (event) {
            switch (event.keyCode) {

                case 37: // left
                    city.star_play.caps.translateX(1);
                    console.log('left');
                    console.log("x : " + city.star_play.caps.position.x)
                    console.log("y : " + city.star_play.caps.position.y)
                    console.log("z : " + city.star_play.caps.position.z)
                    break;

                case 39: // right
                    city.star_play.caps.translateX(-1);
                    console.log('right');
                    break;
            }
        };
        document.addEventListener('keydown', onKeyDown, false);



        scene.background = new THREE.Color(0xff0000)
        scene.fog = new THREE.FogExp2(0xf2c824, 0.0025)

        

        console.log('Game is ready');

    },

    update: function () {
        const eng = city.engine;

        //deplacement
        //this.cam.translateZ(-this.speed);

        // building respawn
        for (let j = 0; j < this.buildings.length; j++) {
            if (this.buildings[j].position.z > this.cam.position.z) {
                this.buildings[j].translateZ(-this.field.height - 50);
                this.buildings[j].position.x =
                    Math.floor(Math.random() * this.field.width) - this.field.width * 0.5;
            }
        }
    },

    vaisseau_texture: function (text) {
        console.log(text);
    },

    build_vaisseau: function (capsule) {
        capsule = capsule.children[0];
        capsule.scale.set(0.1, 0.1, 0.1);
        console.log(capsule);
    },

    build_texture: function (build) {
        console.log(build);
    },

    build_city: function (building_model) {
        building_model = building_model.children[0];
        building_model.scale.set(0.1, 0.1, 0.1);
        console.log(building_model);




        const scene = city.engine.scene;
        const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });

        for (let j = 0; j < this.nb_building; j++) {
            const building = building_model.clone();
            building.material = material;
            building.position.set(
                Math.floor(Math.random() * this.field.width) - this.field.width * 0.5,
                -20 - Math.random() * 10,
                Math.floor(-Math.random() * this.field.height) + 5
            );
            building.geometry.rotateY(Math.random() * 360);
            scene.add(building);
            this.buildings.push(building);




        }
    }
}





