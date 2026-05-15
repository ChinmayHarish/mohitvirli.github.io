import { Html, Svg, Text, useCursor, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { FOOTER_LINKS } from "../../constants";
import { FooterLink } from "../../types";
import GitHubHeatmap from "../common/GitHubHeatmap";

const FooterLinkItem = ({ link }: { link: FooterLink }) => {
  const textRef = useRef<THREE.Group>(null);
  const heatmapTimeout = useRef<NodeJS.Timeout | null>(null);
  const [hovered, setHovered] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const isGithub = link.name === 'GitHub';

  const onPointerOver = () => {
    setHovered(true);
    if (isGithub) {
      if (heatmapTimeout.current) clearTimeout(heatmapTimeout.current);
      setShowHeatmap(true);
    }
  };
  const onPointerOut = () => {
    setHovered(false);
    if (isGithub) {
      heatmapTimeout.current = setTimeout(() => {
        setShowHeatmap(false);
      }, 400);
    }
  };

  const onClick = () => {
    window.open(link.url, '_blank');
  };

  const onPointerMove = (e: MouseEvent) => {
    if (isMobile) return;
    const hoverDiv = document.getElementById(`footer-link-${link.name}`);
    gsap.to(hoverDiv, {
      top: `${e.clientY + 14}px`,
      left: `${e.clientX}px`,
      duration: 0.6,
    });
  };

  const fontProps = {
    font: "./Vercetti-Regular.woff",
    fontSize: 0.2,
    color: 'white',
    onPointerOver,
    onPointerMove,
    onPointerOut,
    onClick,
  };

  useEffect(() => {
    if (!document.getElementById(`footer-link-${link.name}`)) {
      const hoverDiv = document.createElement('div');
      hoverDiv.id = `footer-link-${link.name}`;
      hoverDiv.textContent = link.hoverText ?? link.name.toUpperCase();
      hoverDiv.style.position = 'fixed';
      hoverDiv.style.zIndex = '2';
      hoverDiv.style.bottom = '0';
      hoverDiv.style.opacity = '0';
      hoverDiv.style.left = window.innerWidth / 2 + 'px';
      hoverDiv.style.fontSize = '0.8rem';
      hoverDiv.style.pointerEvents = 'none';
      document.body.appendChild(hoverDiv);
    }
  }, [])

  useEffect(() => {
    if (isMobile) return

    const hoverDiv = document.getElementById(`footer-link-${link.name}`);

    if (hovered) {
      gsap.fromTo(hoverDiv, { opacity: 0 }, { opacity: 0.5, delay: 0.2 });
    } else {
      gsap.to(hoverDiv, { opacity: 0 });
    }

    gsap.to(textRef.current, {
      letterSpacing: hovered ? 0.3 : 0,
      duration: 0.3,
    });

    return () => {
      gsap.killTweensOf(hoverDiv);
      gsap.killTweensOf(textRef.current);
    }
  }, [hovered]);

  useCursor(hovered);

  // Add the heatmap node if this is the GitHub link
  const heatmapNode = isGithub && (
    <Html
      position={[0, 1.5, 0]}
      center
      zIndexRange={[100, 0]}
      style={{
        pointerEvents: showHeatmap ? 'auto' : 'none',
      }}
    >
      <div
        onMouseEnter={() => {
          if (heatmapTimeout.current) clearTimeout(heatmapTimeout.current);
          setShowHeatmap(true);
        }}
        onMouseLeave={() => setShowHeatmap(false)}
      >
        <GitHubHeatmap isVisible={showHeatmap} />
      </div>
    </Html>
  );

  if (isMobile) {
    return (
      <group>
        <Svg
          onClick={onClick}
          onPointerOver={onPointerOver}
          onPointerOut={onPointerOut}
          scale={0.0015}
          position={[0.1, 0.25, 0]}
          src={link.icon}
        />
        {heatmapNode}
      </group>
    );
  }

  return (
    <group>
      <Text ref={textRef} {...fontProps} >
        {link.name.toUpperCase()}
      </Text>
      {heatmapNode}
    </group>
  )
}

const Footer = () => {
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();

  useFrame(() => {
    const d = data.range(0.8, 0.2);
    if (groupRef.current) {
      groupRef.current.visible = d > 0;
    }
  });

  const getLinks = () => {
    return FOOTER_LINKS.map((link, i) => {
      return (
        <group key={i} position={[i * (isMobile ? 0.6 : 2), 0, 0]}>
          <FooterLinkItem link={link} />
        </group>
      );
    });
  };

  return (
    <group position={[0, -44, 18]} rotation={[-Math.PI / 2, 0, 0]} ref={groupRef}>
      <group position={[isMobile ? -1.5 : -4, 0, 0]}>
        {getLinks()}
      </group>
    </group>
  );
};

export default Footer;