try {
    var graphicsInterval = 15;
    var physicsInterval = 500;

    var width = 20;
    var height = 20;

    app.setInterval("physicsUpdate()", 500);

    var horizontalDelta = 0;
    var verticalDelta = 0;

    var horizontalDeltaNextStep = null;
    var verticalDeltaNextStep = null;

    var isMovingVertically = false;
    var isMovingVerticallyNextStep = false;

    var initialSnakeLength = 4;
    var snakeNodes = [];
    var appleX = null;
    var appleY = null;

    reset();
    seedApple();

    app.setTimeOut('drawInitialSnake(); drawApple();', 10);
    var insideOfUpdate = false;
    function physicsUpdate() {
        commitDeltas();

        var head = snakeNodes[snakeNodes.length - 1];
        var x = head.x;
        var y = head.y;
        var nextY = isMovingVertically ? y + verticalDelta : y;
        var nextX = isMovingVertically ? x : x + horizontalDelta;

        if (verticalDelta || horizontalDelta) {
            if (nextX == width) {
                onCollision();
                return;
            }

            if (nextX < 0) {
                onCollision();
                return;
            }

            if (nextY == height) {
                onCollision();
                return;
            }

            if (nextY < 0) {
                onCollision();
                return;
            }

            var growthNode = { x: nextX, y: nextY };
            var isAppleEaten = overlapsWithApple(growthNode);

            if (isAppleEaten) {
                snakeNodes.push(growthNode);
                seedApple();
                drawApple();
                return;
            }

            var tail = snakeNodes[0];
            setPixel(nextX, nextY);
            unsetPixel(tail.x, tail.y);

            for (var i = 0; i < snakeNodes.length - 1; i++) {
                snakeNodes[i].x = snakeNodes[i + 1].x;
                snakeNodes[i].y = snakeNodes[i + 1].y;
            }

            head.x = nextX;
            head.y = nextY;

            for (var i = 0; i < snakeNodes.length - 1; i++) {
                var node = snakeNodes[i];
                if (head.x == node.x && head.y == node.y) {
                    onCollision();
                    return;
                }
            }
        }
    }

    function drawApple() {
        setPixel(appleX, appleY);
    }

    function seedApple() {
        makeRandomApplePosition();

        while (isAppleInSnake()) {
            makeRandomApplePosition();
        }
    }

    function isAppleInSnake() {
        for (var node in snakeNodes) {
            if (overlapsWithApple(node)) {
                return true;
            }
        }

        return false;
    }

    function overlapsWithApple(node) {
        return node.x == appleX && node.y == appleY;
    }

    function makeRandomApplePosition() {
        appleX = getRandomCoordinate(width);
        appleY = getRandomCoordinate(height);
    }

    function getRandomCoordinate(max) {
        return Math.floor(Math.random() * max);
    }

    function commitDeltas() {
        isMovingVertically = isMovingVerticallyNextStep;

        if (horizontalDeltaNextStep) {
            horizontalDelta = horizontalDeltaNextStep;
        }

        if (verticalDeltaNextStep) {
            verticalDelta = verticalDeltaNextStep;
        }
    }

    function reset() {
        snakeNodes = [];
        for (var i = 0; i < initialSnakeLength; i++) {
            snakeNodes.push(({ x: i, y: 0 }));
        }
    }

    function onCollision() {
        horizontalDeltaNextStep = horizontalDelta = 0;
        verticalDeltaNextStep = verticalDelta = 0;
        isMovingVerticallyNextStep = isMovingVertically = true;

        reset();
        seedApple();
        clearAll();
        drawInitialSnake();
        drawApple();
    }

    function drawInitialSnake() {
        for (var node of snakeNodes) {
            setPixel(node.x, node.y);
        }
    }

    function clearAll() {
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                unsetPixel(x, y);
            }
        }
    }

    function leftClicked() {
        if (!isMovingVertically && horizontalDelta == 1) {
            return;
        }

        horizontalDeltaNextStep = -1;
        isMovingVerticallyNextStep = false;
    }

    function bottomClicked() {
        if (isMovingVertically && verticalDelta == -1) {
            return;
        }

        verticalDeltaNextStep = 1;
        isMovingVerticallyNextStep = true;
    }

    function topClicked() {
        if (isMovingVertically && verticalDelta == 1) {
            return;
        }

        verticalDeltaNextStep = -1;
        isMovingVerticallyNextStep = true;
    }

    function rightClicked() {
        if (!isMovingVertically && horizontalDelta == -1) {
            return;
        }

        horizontalDeltaNextStep = 1;
        isMovingVerticallyNextStep = false;
    }

    function setPixel(x, y) {
        var fieldName = 'mtx_' + x + '_' + y;
        getField(fieldName).display = display.hidden;
    }

    function unsetPixel(x, y) {
        var fieldName = 'mtx_' + x + '_' + y;
        getField(fieldName).display = display.visible;
    }
} catch (e) {
    app.alert(e);
}