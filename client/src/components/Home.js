import React from "react";
import ParticleField from "react-particles-webgl";
import { isAuthenticated } from "../auth";

const config = {
  // '2D' or '3D' particle field
  dimension: "3D",
  boundaryType: "bounce",
  velocity: 1,
  // Toggles antialiasing -- must be set during construction, cannot be changed after initial render
  // Slight performance optimization to set false, although lines will appear more jagged
  antialias: false,
  // Min/Max multipliers which constraint how particles move in each direction
  // The default values here allow for particles to move in completely random x, y, z directions
  // See the "Snowfall" preset for an example of how to use these values
  direction: {
    xMin: -1,
    xMax: 1,
    yMin: -1,
    yMax: 1,
    zMin: -1,
    zMax: 1,
  },
  lines: {
    // 'rainbow' or 'solid' color of lines
    colorMode: "solid",
    // Color of lines if colorMode: 'solid', must be hex color
    color: "#4477ff",
    // Transparency of lines
    transparency: 0.9,
    // true/false limit the maximum number of line connections per particle
    limitConnections: true,
    maxConnections: 5,
    // Minimum distance needed to draw line between to particles
    minDistance: 150,
    // true/false render lines
    visible: true,
  },
  particles: {
    // 'rainbow' or 'solid' color of particles
    colorMode: "rainbow",
    // Color of lines if colorMode: 'solid', must be hex color
    color: "#4477ff",
    // Transparency of particles
    transparency: 0.9,
    // 'square' or 'circle' shape of particles
    shape: "circle",
    // The exact number of particles to render
    count: 500,
    // The minimum particle size
    minSize: 10,
    // The maximum particle size
    maxSize: 75,
    // true/false render particles
    visible: true,
  },
  /*
   * The camera rig is comprised of Three.js OrbitControls
   * Pass any valid OrbitControls properties, consult docs for more info
   *
   * https://threejs.org/docs/#examples/controls/OrbitControls
   */
  cameraControls: {
    // Enable or disable all camera interaction (click, drag, touch etc)
    enabled: true,
    // Enable or disable smooth dampening of camera movement
    enableDamping: true,
    dampingFactor: 0.2,
    // Enable or disable zooming in/out of camera
    enableZoom: true,
    // Enable or disable constant rotation of camera around scene
    autoRotate: true,
    // Rotation speed -- higher is faster
    autoRotateSpeed: 0.9,
    // If true, camera position will be reset whenever any option changes (including this one)
    // Useful when turning off autoRotate, the camera will return to FOV where scene fits to canvas
    resetCameraFlag: false,
  },
};

function Home(props) {
  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
      >
        <ParticleField config={config} />
      </div>
      <div className="flex items-center justify-center h-screen">
        <div
          style={{ zIndex: "1" }}
          className="bg-blue-500 text-white text-center font-bold rounded-lg border shadow-lg p-4 m-auto w-3/4"
        >
          <h3>Welcome!</h3>
          <br />
          <p className="text-center">
            This app can be used to check pollution levels, nearby taxi centers
            and to plan journeys to places in london. Just sign up and login to
            use it.
            <br />
            <br />
            {!isAuthenticated && (
              <p>
                (If you don't want to sign up you can use the email:
                user@user.com and password: user123 to login.)
              </p>
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
