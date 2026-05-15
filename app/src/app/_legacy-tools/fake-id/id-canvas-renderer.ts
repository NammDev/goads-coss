export type Country = "us" | "ph" | "in";

export type IDFields = {
  country: Country;
  fullName: string;
  dob: string;
  gender: string;
  address: string;
  idNumber: string;
};

type CountryConfig = {
  label: string;
  flag: string;
  gradient: [string, string];
  docTitle: string;
  idLabel: string;
};

const CONFIGS: Record<Country, CountryConfig> = {
  us: {
    label: "United States",
    flag: "🇺🇸",
    gradient: ["#1a3a6b", "#2d5a9e"],
    docTitle: "CALIFORNIA DRIVER LICENSE",
    idLabel: "DL No.",
  },
  ph: {
    label: "Philippines",
    flag: "🇵🇭",
    gradient: ["#0038a8", "#ce1127"],
    docTitle: "PHILIPPINE NATIONAL ID",
    idLabel: "PCN",
  },
  in: {
    label: "India",
    flag: "🇮🇳",
    gradient: ["#ff9933", "#138808"],
    docTitle: "AADHAAR CARD",
    idLabel: "UID",
  },
};

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function renderIDCard(canvas: HTMLCanvasElement, fields: IDFields): void {
  const W = 856;
  const H = 540;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const cfg = CONFIGS[fields.country];

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, cfg.gradient[0]);
  grad.addColorStop(1, cfg.gradient[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Subtle pattern overlay (dots)
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  for (let x = 20; x < W; x += 30) {
    for (let y = 20; y < H; y += 30) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Header bar
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(0, 0, W, 80);

  // Flag + Title
  ctx.font = "bold 28px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "middle";
  ctx.fillText(cfg.flag, 24, 40);

  ctx.font = "bold 20px sans-serif";
  ctx.fillText(cfg.docTitle, 72, 40);

  ctx.font = "13px sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillText(cfg.label, 72, 62);

  // Photo placeholder box
  const photoX = 40;
  const photoY = 105;
  const photoW = 160;
  const photoH = 200;

  ctx.fillStyle = "rgba(255,255,255,0.15)";
  drawRoundedRect(ctx, photoX, photoY, photoW, photoH, 8);
  ctx.fill();

  // Person silhouette
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.beginPath();
  ctx.arc(photoX + photoW / 2, photoY + 70, 38, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.beginPath();
  ctx.arc(photoX + photoW / 2, photoY + 195, 65, Math.PI, 0);
  ctx.fill();

  ctx.font = "11px sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.textAlign = "center";
  ctx.fillText("PHOTO", photoX + photoW / 2, photoY + photoH + 16);
  ctx.textAlign = "left";

  // Fields area
  const fieldsX = 230;
  const fieldsY = 105;
  const lineH = 52;

  const rows: Array<{ label: string; value: string }> = [
    { label: "FULL NAME", value: fields.fullName || "—" },
    { label: "DATE OF BIRTH", value: fields.dob || "—" },
    { label: "SEX", value: fields.gender || "—" },
    { label: "ADDRESS", value: fields.address || "—" },
    { label: cfg.idLabel, value: fields.idNumber || "—" },
  ];

  rows.forEach((row, i) => {
    const y = fieldsY + i * lineH;

    ctx.font = "10px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillText(row.label, fieldsX, y);

    ctx.font = "bold 17px sans-serif";
    ctx.fillStyle = "#ffffff";
    const displayVal =
      row.value.length > 38 ? row.value.slice(0, 36) + "…" : row.value;
    ctx.fillText(displayVal, fieldsX, y + 20);

    // Underline
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(fieldsX, y + 30);
    ctx.lineTo(W - 40, y + 30);
    ctx.stroke();
  });

  // Footer bar
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(0, H - 50, W, 50);

  ctx.font = "11px monospace";
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.textBaseline = "middle";
  ctx.fillText(
    "FOR TESTING / EDUCATIONAL PURPOSES ONLY — NOT A REAL DOCUMENT",
    24,
    H - 25
  );
}
