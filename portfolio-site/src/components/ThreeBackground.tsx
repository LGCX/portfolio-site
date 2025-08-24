'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ThreeBackgroundProps {
  className?: string;
}

export default function ThreeBackground({ className = '' }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    animationId?: number;
  } | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    if (!containerRef.current) return;

    // Scene setup functions adapted from three-background
    function setupCamera() {
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.zoom = 5;
      camera.position.set(0, -0.2, 10);
      camera.updateProjectionMatrix();
      return camera;
    }

    function setupRenderer() {
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0); // Transparent background
      return renderer;
    }

    function loadStripeGradientTexture() {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load('/gradient-chrome.png');
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    }

    function createEnvRenderTarget() {
      return new THREE.WebGLRenderTarget(1000, 1000, {
        wrapS: THREE.ClampToEdgeWrapping,
        wrapT: THREE.ClampToEdgeWrapping
      });
    }

    function setupUniforms(stripeGradientTexture: THREE.Texture, envRenderTarget: THREE.WebGLRenderTarget) {
      return {
        u_time: { value: 0 },
        u_noise_scale: { value: new THREE.Vector2(0.2, 0.45) },
        u_noise_amp: { value: 1.0 },
        u_noise_speed: { value: 0.03 },
        u_offset: { value: 0.05 },
        u_incline: { value: new THREE.Vector3(0.2, 0, 0) },
        u_noise_translate_speed: { value: -0.05 },
        u_env_texture: { value: envRenderTarget.texture },
        u_edge_reflection_min: { value: 0.0 },
        u_edge_reflection_max: { value: 1.0 },
        u_gradient_ramp: { value: stripeGradientTexture },
        u_gradient_ramp_min: { value: 0.5 },
        u_gradient_ramp_max: { value: -0.3 },
        u_gradient_scale: { value: new THREE.Vector3(0.15, 1.0, 1.0) },
        u_gradient_noise_speed: { value: new THREE.Vector3(0.06, 0.05, 0.0) },
        u_gradient_grain_scale: { value: new THREE.Vector2(1.5, 0.0) },
        u_gradient_grain_offset: { value: new THREE.Vector2(0.07, 0.0) }
      };
    }

    function createGradientMaterial(uniforms: any) {
      return new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
          vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
          vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
          vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }
          float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
          vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
          vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
          vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
          float snoise(in vec3 v) {
            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 =   v - i + dot(i, C.xxx) ;
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute( permute( permute(
                      i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
            float n_ = 0.142857142857;
            vec3  ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);
            vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
          }
          varying vec3 vWorldPosition;
          uniform sampler2D u_gradient_ramp;
          uniform float u_gradient_ramp_min;
          uniform float u_gradient_ramp_max;
          uniform vec3 u_gradient_scale;
          uniform vec3 u_gradient_noise_speed;
          uniform vec2 u_gradient_grain_scale;
          uniform vec2 u_gradient_grain_offset;
          uniform float u_time;
          void main() {
            float grain_offset = snoise(
              vec3(
                vWorldPosition.x * u_gradient_grain_scale.x + 100.0,
                vWorldPosition.y * u_gradient_grain_scale.y + 50.0,
                u_time * 0.01
              )
            );
            float n = snoise(
              vec3(
                vWorldPosition.x * u_gradient_scale.x + u_time * u_gradient_noise_speed.x + grain_offset * u_gradient_grain_offset.x,
                vWorldPosition.y * u_gradient_scale.y + u_time * u_gradient_noise_speed.y + grain_offset * u_gradient_grain_offset.y,
                vWorldPosition.z * u_gradient_scale.z + u_time * u_gradient_noise_speed.z
              )
            );
            n = mix(u_gradient_ramp_min, u_gradient_ramp_max, n);
            vec4 texColor = texture(u_gradient_ramp, vec2(n, 0.0));
            gl_FragColor = vec4(texColor.rgb, 1.0);
          }
        `,
        uniforms: uniforms,
        side: THREE.DoubleSide
      });
    }

    function createEnvScene(gradientMaterial: THREE.ShaderMaterial) {
      const envScene = new THREE.Scene();
      const envGeometry = new THREE.PlaneGeometry(20, 20);
      const envMesh = new THREE.Mesh(envGeometry, gradientMaterial);
      envMesh.position.z = -5;
      envScene.add(envMesh);
      return envScene;
    }

    function createMainMaterial(uniforms: any) {
      return new THREE.ShaderMaterial({
        vertexShader: `
          precision highp float;
          float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
          vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
          vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
          vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }
          float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
          vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
          vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
          vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
          float psrdnoise(vec2 x, vec2 period, float alpha, out vec2 gradient) {
            vec2 uv = vec2(x.x + x.y * 0.5, x.y);
            vec2 i0 = floor(uv);
            vec2 f0 = fract(uv);
            float cmp = step(f0.y, f0.x);
            vec2 o1 = vec2(cmp, 1.0 - cmp);
            vec2 i1 = i0 + o1;
            vec2 i2 = i0 + vec2(1.0, 1.0);
            vec2 v0 = vec2(i0.x - i0.y * 0.5, i0.y);
            vec2 v1 = vec2(v0.x + o1.x - o1.y * 0.5, v0.y + o1.y);
            vec2 v2 = vec2(v0.x + 0.5, v0.y + 1.0);
            vec2 x0 = x - v0;
            vec2 x1 = x - v1;
            vec2 x2 = x - v2;
            vec3 iu, iv;
            vec3 xw, yw;
            if(any(greaterThan(period, vec2(0.0)))) {
              xw = vec3(v0.x, v1.x, v2.x);
              yw = vec3(v0.y, v1.y, v2.y);
              if(period.x > 0.0)
                xw = mod(vec3(v0.x, v1.x, v2.x), period.x);
              if(period.y > 0.0)
                yw = mod(vec3(v0.y, v1.y, v2.y), period.y);
              iu = floor(xw + 0.5 * yw + 0.5);
              iv = floor(yw + 0.5);
            } else {
              iu = vec3(i0.x, i1.x, i2.x);
              iv = vec3(i0.y, i1.y, i2.y);
            }
            vec3 hash = mod(iu, 289.0);
            hash = mod((hash * 51.0 + 2.0) * hash + iv, 289.0);
            hash = mod((hash * 34.0 + 10.0) * hash, 289.0);
            vec3 psi = hash * 0.07482 + alpha;
            vec3 gx = cos(psi);
            vec3 gy = sin(psi);
            vec2 g0 = vec2(gx.x, gy.x);
            vec2 g1 = vec2(gx.y, gy.y);
            vec2 g2 = vec2(gx.z, gy.z);
            vec3 w = 0.8 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2));
            w = max(w, 0.0);
            vec3 w2 = w * w;
            vec3 w4 = w2 * w2;
            vec3 gdotx = vec3(dot(g0, x0), dot(g1, x1), dot(g2, x2));
            float n = dot(w4, gdotx);
            vec3 w3 = w2 * w;
            vec3 dw = -8.0 * w3 * gdotx;
            vec2 dn0 = w4.x * g0 + dw.x * x0;
            vec2 dn1 = w4.y * g1 + dw.y * x1;
            vec2 dn2 = w4.z * g2 + dw.z * x2;
            gradient = 10.9 * (dn0 + dn1 + dn2);
            return 10.9 * n;
          }
          attribute vec4 tangent;
          uniform float u_time;
          uniform vec2 u_noise_scale;
          uniform float u_noise_amp;
          uniform float u_noise_speed;
          uniform float u_offset;
          uniform vec3 u_incline;
          uniform float u_noise_translate_speed;
          varying vec3 v_normal;
          varying vec3 v_position;
          varying vec2 v_reflected_normal;
          vec3 displace(vec3 pos) {
            vec2 g;
            float d = psrdnoise(vec2(
              pos.x * u_noise_scale.x + u_noise_translate_speed * u_time,
              pos.z * u_noise_scale.y
            ), vec2(10.0), u_time * u_noise_speed, g);
            return vec3(
              pos.x,
              pos.y + d * u_noise_amp + pos.x * u_incline.x,
              pos.z
            );
          }
          void main(void) {
            vec3 biTangent = cross(tangent.xyz, normal.xyz);
            vec3 displaced = displace(position.xyz);
            vec3 displacedTangent = displace(position.xyz - tangent.xyz * u_offset);
            vec3 displacedBiTangent = displace(position.xyz - biTangent * u_offset);
            v_normal = cross(
              normalize(displacedBiTangent - displaced),
              normalize(displacedTangent - displaced)
            );
            v_position = displaced;
            vec4 p = vec4(displaced, 1.0);
            vec3 e = normalize(vec3(modelViewMatrix * p));
            vec3 n = normalize(normalMatrix * v_normal);
            vec3 r = reflect(e, n);
            float m = 2. * sqrt(
              pow(r.x, 2.0) +
              pow(r.y, 2.0) +
              pow(r.z + 1.0, 2.0)
            );
            v_reflected_normal = r.xy / m + .5;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          varying vec3 v_normal;
          varying vec2 v_reflected_normal;
          uniform float u_edge_reflection_max;
          uniform float u_edge_reflection_min;
          uniform sampler2D u_env_texture;
          void main() {
            vec4 base = texture2D(
              u_env_texture,
              v_reflected_normal
            );
            base = mix(
              base,
              vec4(1.0),
              mix(
                u_edge_reflection_min,
                u_edge_reflection_max,
                abs(
                  pow(
                    dot(v_normal, vec3(0.0, 1.0, 0.0)),
                    10.0
                  )
                )
              )
            );
            gl_FragColor = base;
          }
        `,
        uniforms: uniforms
      });
    }

    function transformPlane(geometry: THREE.PlaneGeometry) {
      const positions = geometry.attributes.position;
      const radius = 0.1;
      const halfCircum = radius * Math.PI;
      const quartCircum = halfCircum / 2;
      for (let i = 0; i < positions.count; i++) {
        const vertex = new THREE.Vector3().fromBufferAttribute(positions, i);
        if (vertex.x < -quartCircum) {
          vertex.z += radius;
        } else if (vertex.x < quartCircum) {
          vertex.z = Math.cos((vertex.x + quartCircum) / (quartCircum * 2) * Math.PI) * radius;
          vertex.x = Math.cos((vertex.x + quartCircum) / (quartCircum * 2) * Math.PI - Math.PI / 2) * radius - quartCircum;
        } else {
          vertex.z -= radius;
          vertex.x = -vertex.x;
        }
        positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }
      for (let i = 0; i < positions.count; i++) {
        const vertex = new THREE.Vector3().fromBufferAttribute(positions, i);
        vertex.applyEuler(new THREE.Euler(Math.PI / 2, 0, Math.PI / 2));
        positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }
      positions.needsUpdate = true;
      geometry.computeVertexNormals();
      geometry.computeTangents();
    }

    function createPlane(uniforms: any) {
      const planeWidth = 8;
      const planeHeight = 10;
      const widthSegments = planeWidth * 40;
      const heightSegments = planeHeight * 40;
      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, widthSegments, heightSegments);
      geometry.computeTangents();
      const material = createMainMaterial(uniforms);
      const plane = new THREE.Mesh(geometry, material);
      transformPlane(geometry);
      return plane;
    }

    function setupControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      return controls;
    }

    function onWindowResize(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Initialize the scene
    const scene = new THREE.Scene();
    const camera = setupCamera();
    const renderer = setupRenderer();
    
    // Append to container
    containerRef.current.appendChild(renderer.domElement);

    const stripeGradientTexture = loadStripeGradientTexture();
    const envRenderTarget = createEnvRenderTarget();
    const uniforms = setupUniforms(stripeGradientTexture, envRenderTarget);
    const gradientMaterial = createGradientMaterial(uniforms);
    const envScene = createEnvScene(gradientMaterial);
    const plane = createPlane(uniforms);
    scene.add(plane);
    const controls = setupControls(camera, renderer);

    // Animation loop
    function animate(time: number) {
      const seconds = time * 0.001;
      uniforms.u_time.value = seconds;
      renderer.setRenderTarget(envRenderTarget);
      renderer.render(envScene, camera);
      renderer.setRenderTarget(null);
      controls.update();
      renderer.render(scene, camera);
      sceneRef.current!.animationId = requestAnimationFrame(animate);
    }

    // Start animation
    const animationId = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => onWindowResize(camera, renderer);
    window.addEventListener('resize', handleResize);

    // Store scene reference
    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      animationId
    };

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current?.renderer) {
        sceneRef.current.renderer.dispose();
      }
      if (containerRef.current && sceneRef.current?.renderer.domElement) {
        containerRef.current.removeChild(sceneRef.current.renderer.domElement);
      }
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
