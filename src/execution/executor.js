const { spawn, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const TIMEOUT_MS = 3000;
const MAX_MEMORY_MB = 50;

function executeCode(code) {
  return new Promise((resolve) => {
    const tempFile = path.join(os.tmpdir(), `temp_${Date.now()}.js`);
    fs.writeFileSync(tempFile, code);

    let output = "";
    let error = "";
    let killed = false;

    const child = spawn("node", [
      `--max-old-space-size=${MAX_MEMORY_MB}`,
      tempFile,
    ]);

    console.log("Spawned process PID:", child.pid); 

    const timer = setTimeout(() => {
      killed = true;
      try {
        execSync(`taskkill /PID ${child.pid} /T /F`);
      } catch (e) {}
      cleanup();
      resolve({
        success: false,
        output: `Execution timed out after ${TIMEOUT_MS / 1000} seconds`,
      });
    }, TIMEOUT_MS);

    child.stdout.on("data", (data) => {
      output += data.toString();
    });
    child.stderr.on("data", (data) => {
      error += data.toString();
    });

    child.on("close", () => {
      if (killed) return;
      clearTimeout(timer);
      cleanup();
      if (error) {
        resolve({ success: false, output: error });
      } else {
        resolve({ success: true, output });
      }
    });

    function cleanup() {
      try {
        fs.unlinkSync(tempFile);
      } catch (e) {}
    }
  });
}

module.exports = { executeCode };
