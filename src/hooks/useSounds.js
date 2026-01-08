import { useCallback, useEffect, useRef } from "react";
import { useMediaQuery } from "./useMediaQuery";

export const useSounds = () => {
  const audioContextRef = useRef(null);
  const pressBufferRef = useRef(null);
  const releaseBufferRef = useRef(null);

  useEffect(() => {
    const loadSound = async () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        const response = await fetch('/assets/keycap-sounds/press.mp3');
        const arrayBuffer = await response.arrayBuffer();
        const decodedBuffer = await ctx.decodeAudioData(arrayBuffer);
        pressBufferRef.current = decodedBuffer;

        const releaseResponse = await fetch('/assets/keycap-sounds/release.mp3');
        const releaseArrayBuffer = await releaseResponse.arrayBuffer();
        const releaseDecodedBuffer = await ctx.decodeAudioData(releaseArrayBuffer);
        releaseBufferRef.current = releaseDecodedBuffer;
      } catch (error) {
        console.error("Failed to load keycap sound", error);
      }
    };

    loadSound();

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const getContext = useCallback(() => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);
  
  const isMobile = useMediaQuery("(max-width: 768px)");

  const playSoundBuffer = useCallback((buffer, baseDetune = 0) => {
    try {
      const ctx = getContext();
      if (!ctx || !buffer) return;

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Add slight variation
      source.detune.value = baseDetune + (Math.random() * 200) - 100;

      const gainNode = ctx.createGain();
      // Mobile needs much higher gain (8.0) because of small speakers
      // Desktop uses standard gain (0.4) to prevent ear-blasting
      gainNode.gain.value = isMobile ? 8.0 : 0.4;

      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.start(0);
    } catch (err) {
      console.error(err);
    }
  }, [getContext]);

  const playPressSound = useCallback(() => {
    playSoundBuffer(pressBufferRef.current);
  }, [playSoundBuffer]);

  const playReleaseSound = useCallback(() => {
    playSoundBuffer(releaseBufferRef.current);
  }, [playSoundBuffer]);

  return { playPressSound, playReleaseSound };
};
