/**
 * SharedSVGFilters — placed ONCE in the DOM.
 * All ReflectiveCards reference the same #metallic-displacement filter.
 * This matches the original react-bits code exactly.
 */
const SharedSVGFilters = ({
  displacementStrength = 20,
  noiseScale = 1,
  specularConstant = 5,
  glassDistortion = 30,
}) => {
  const baseFrequency = 0.03 / Math.max(0.1, noiseScale);

  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none', opacity: 0 }}
      aria-hidden="true"
    >
      <defs>
        <filter id="metallic-displacement" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="turbulence"
            baseFrequency={baseFrequency}
            numOctaves="2"
            result="noise"
          />
          <feColorMatrix in="noise" type="luminanceToAlpha" result="noiseAlpha" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={displacementStrength}
            xChannelSelector="R"
            yChannelSelector="G"
            result="rippled"
          />
          <feSpecularLighting
            in="noiseAlpha"
            surfaceScale={displacementStrength}
            specularConstant={specularConstant}
            specularExponent="20"
            lightingColor="#ffffff"
            result="light"
          >
            <fePointLight x="0" y="0" z="300" />
          </feSpecularLighting>
          <feComposite in="light" in2="rippled" operator="in" result="light-effect" />
          <feBlend in="light-effect" in2="rippled" mode="screen" result="metallic-result" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="solidAlpha"
          />
          <feMorphology in="solidAlpha" operator="erode" radius="45" result="erodedAlpha" />
          <feGaussianBlur in="erodedAlpha" stdDeviation="10" result="blurredMap" />
          <feComponentTransfer in="blurredMap" result="glassMap">
            <feFuncA type="linear" slope="0.5" intercept="0" />
          </feComponentTransfer>
          <feDisplacementMap
            in="metallic-result"
            in2="glassMap"
            scale={glassDistortion}
            xChannelSelector="A"
            yChannelSelector="A"
            result="final"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SharedSVGFilters;
