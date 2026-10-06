'use client';

import { useEffect, useRef } from 'react';
import {
  NeutralToneMapping,
  Box3,
  Group,
  PMREMGenerator,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  type Material,
  type Mesh,
  type Texture,
} from 'three';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/** Modelo "Apple II Computer" (dark_igorek, CC BY 4.0), com texturas em WebP e malha comprimida com meshopt. */
export const MODEL_URL = '/models/apple-ii-computer.glb';

/** Giro extra para o modelo começar de frente quando a rotação do usuário está em 0. */
const MODEL_YAW_OFFSET = 0;
const DEG = Math.PI / 180;

export interface MacViewer3DProps {
  rx: number;
  ry: number;
  dragging: boolean;
  /** Sem suavização do giro (prefers-reduced-motion). */
  reducedMotion: boolean;
  onReady: () => void;
  onError: () => void;
}

/** Visualizador WebGL do computador. Este módulo é o ÚNICO que importa three.js e só é carregado quando o viewer entra na tela. */
export default function MacViewer3D({ rx, ry, dragging, reducedMotion, onReady, onError }: MacViewer3DProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const target = useRef({ rx, ry });
  const flags = useRef({ dragging, reducedMotion });
  const requestRender = useRef<() => void>(() => {});
  const callbacks = useRef({ onReady, onError });

  useEffect(() => {
    target.current = { rx, ry };
    flags.current = { dragging, reducedMotion };
    requestRender.current();
  }, [rx, ry, dragging, reducedMotion]);

  useEffect(() => {
    callbacks.current = { onReady, onError };
  }, [onReady, onError]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
        preserveDrawingBuffer: true,
      });
    } catch {
      callbacks.current.onError();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = NeutralToneMapping; // preserva melhor as cores do modelo (o ACES as lavava)
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(28, 1, 0.1, 100);
    const pivot = new Group();
    scene.add(pivot);

    const pmrem = new PMREMGenerator(renderer);
    const envTexture: Texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    let current = { rx: target.current.rx, ry: target.current.ry };
    let raf = 0;
    let loaded = false;
    let disposed = false;

    const render = () => {
      raf = 0;
      if (disposed || !loaded) return;
      const { dragging: drag, reducedMotion: reduced } = flags.current;
      const t = target.current;
      const immediate = drag || reduced;
      current.rx = immediate ? t.rx : current.rx + (t.rx - current.rx) * 0.18;
      current.ry = immediate ? t.ry : current.ry + (t.ry - current.ry) * 0.18;
      pivot.rotation.set(current.rx * DEG, current.ry * DEG + MODEL_YAW_OFFSET, 0);
      renderer.render(scene, camera);
      const settled = Math.abs(t.rx - current.rx) < 0.05 && Math.abs(t.ry - current.ry) < 0.05;
      if (!settled) raf = requestAnimationFrame(render);
      else {
        current = { ...t };
        pivot.rotation.set(t.rx * DEG, t.ry * DEG + MODEL_YAW_OFFSET, 0);
        renderer.render(scene, camera);
      }
    };
    requestRender.current = () => {
      if (!raf && !disposed) raf = requestAnimationFrame(render);
    };

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      requestRender.current();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load(
      MODEL_URL,
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;
        const box = new Box3().setFromObject(model);
        const size = box.getSize(new Vector3());
        const center = box.getCenter(new Vector3());
        model.position.sub(center);
        pivot.add(model);
        // Enquadra o modelo: a maior dimensão ocupa ~66% da altura visível.
        const maior = Math.max(size.x, size.y, size.z);
        const distancia = maior / 0.66 / 2 / Math.tan((camera.fov * DEG) / 2);
        camera.position.set(0, 0, distancia + size.z / 2);
        camera.lookAt(0, 0, 0);
        camera.far = distancia * 6;
        camera.updateProjectionMatrix();
        loaded = true;
        resize();
        render();
        callbacks.current.onReady();
      },
      undefined,
      () => {
        if (!disposed) callbacks.current.onError();
      },
    );

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      requestRender.current = () => {};
      pivot.traverse((obj) => {
        const mesh = obj as Mesh;
        mesh.geometry?.dispose();
        const materials = ([] as Material[]).concat(mesh.material ?? []);
        for (const m of materials) {
          for (const value of Object.values(m)) if (value && (value as Texture).isTexture) (value as Texture).dispose();
          m.dispose();
        }
      });
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} data-testid="mac-3d" className="absolute inset-0" />;
}
