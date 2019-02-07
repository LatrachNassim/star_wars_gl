city.engine = {
    init: function (config) {

        // --- scene
        this.scene = new THREE.Scene();
       
        


        config = config || {};
        const fov = config.camera_fov || 75;

        


        // --- camera
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, 1, 5000);
        this.scene.add(this.camera);

        const perf = city.configuration.high_performance || true;

          // --- renderer
          this.renderer = new THREE.WebGLRenderer({ antialias: perf });
          this.renderer.setPixelRatio(window.devicePixelRatio);
          this.renderer.setSize(window.innerWidth, window.innerHeight);
  
          if (city.configuration.high_performance) {
              this.renderer.shadowMap.enabled = true;
              this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
          }
          document.body.appendChild(this.renderer.domElement);
  
          //debug mode
          if (city.configuration.debug_mode && Stats) {
              this.stats = new Stats();
              this.stats.showPanel(0);// 0: fps, 1: ms, 2: mb, 3+: custom
              document.body.appendChild(this.stats.dom);
          }
          /* window.requestAnimationFrame =(function(){
               return (
                   window.requestAnimationFrame ||
                   window.webkitRequestAnimationFrame ||
                   window.
               )
           })*/
  
  
  
          console.log('engine ready');
      },
      update() {
          this.renderer.render(this.scene, this.camera);
      }
  };