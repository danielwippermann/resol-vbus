(function () {
    let canvas = null;
    let backgroundImage = null;

    function runAsync(fn) {
        async function runner() {
            await fn();
        }

        runner().then(null, err => {
            console.error(err);
        });
    }

    async function updateAsync(options) {
        const {
            width,
            height,
            backgroundImageUrl,
            render,
        } = options;

        const httpResponse = await fetch('/api/v3/live-data');
        const packetFields = await httpResponse.json();

        console.log(packetFields);

        const ctx = canvas.getContext('2d');

        const renderer = {
            drawVBusField(packetFieldId, x, y, style) {
                const packetField = packetFields.find(packetField => packetField.id === packetFieldId);
                if (packetField) {
                    ctx.save();

                    try {
                        const text = `${packetField.textValue}${packetField.unitText || ''}`;

                        if (style.font) {
                            ctx.font = style.font;
                        }
                        if (style.fillStyle) {
                            ctx.fillStyle = style.fillStyle;
                        }
                        ctx.fillText(text, x, y);
                    } finally {
                        ctx.restore();
                    }
                } else {
                    console.log(`Unknown packet field ID ${packetFieldId}`);
                }
            }
        };

        ctx.save();

        try {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(backgroundImage, 0, 0, width, height);

            render(renderer);
        } finally {
            ctx.restore();
        }
    }

    function update(options) {
        runAsync(async () => {
            try {
                await updateAsync(options);
            } catch (err) {
                console.error(err);
            }

            setTimeout(() => {
                update(options);
            }, 10000);
        });
    }

    async function initializeAsync(options) {
        const {
            width,
            height,
            backgroundImageUrl,
            render,
        } = options;

        const container = document.getElementById('container');

        const innerContainer = document.createElement('div');
        innerContainer.style = "position: fixed; inset: 0; z-index: 2; background: white;"
        container.appendChild(innerContainer);

        await new Promise(resolve => setTimeout(resolve, 0));

        const xScale = innerContainer.clientWidth / width;
        const yScale = innerContainer.clientHeight / height;
        const scale = Math.min(Math.min(xScale, yScale), 1);

        const scaledWidth = Math.ceil(width * scale);
        const scaledHeight = Math.ceil(height * scale);

        canvas = document.createElement('canvas');
        canvas.style = `position: absolute; inset: 0; display: block; margin: auto; width: ${scaledWidth}px; height: ${scaledHeight}px;`;
        canvas.width = width;
        canvas.height = height;
        innerContainer.appendChild(canvas);

        backgroundImage = new Image();
        await new Promise((resolve) => {
            backgroundImage.onload = () => resolve();
            backgroundImage.src = backgroundImageUrl;
        });

        update(options);
    }

    function initialize(options) {
        runAsync(async () => {
            await initializeAsync(options);
        });
    }

    window.initializeResolVBusLiveView = initialize;
})();
