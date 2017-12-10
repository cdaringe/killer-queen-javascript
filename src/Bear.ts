
class Bear {

    private game: number;
    private bearLoop: number;

    private checkForWin(): void {
        var goldWin = true;
        var blueWin = true;
        for (var i = 0; i < ballHolders.length; i++) {
            if (ballHolders[i].side === "blue" && ballHolders[i].occupied === false) {
                blueWin = false;
                break;
            }
        }
        for (var i = 0; i < ballHolders.length; i++) {
            if (ballHolders[i].side === "gold" && ballHolders[i].occupied === false) {
                goldWin = false;
                break;
            }
        }

        if (goldWin) {
            clearInterval(this.game);
            alert("GOLD ECONOMY WIN");
            return;
        }

        if (blueWin) {
            clearInterval(this.game);
            alert("BLUE ECONOMY WIN");
            return;
        }
    }
  
    private changeToWarrior(): void {
        clearInterval(this.bearLoop);
        this.element.parentNode.removeChild(this.element);

    }

    private animateStanding(): void {
        this.element.className = "bear " + this.className;
    }

    private animateWalkLeft(): void {
        let nextClass: string = "bear " + this.className + " left";
        if (this.element.className === nextClass) {
            this.element.className = nextClass + "2";
        } else {
            this.element.className = nextClass;
        }
    }

    private animateWalkRight(): void {
        let nextClass: string = "bear " + this.className + " right";
        if (this.element.className === nextClass) {
            this.element.className = nextClass + "2";
        } else {
            this.element.className = nextClass;
        }
    }

    constructor(public element: HTMLElement, public className: string, color: Side, leftCode: number, rightCode: number, jumpCode: number) {

        element.className = "bear " + className;

        let dx: Array<number> = [];
        let dy: number = 8;
        let leftDown: boolean = false;
        let rightDown: boolean = false;
        let jumpTimeout: number;
        let jumpStart: boolean = false;
        let ballInPocession: Ball | undefined;
        let leftSnail: number = (new Date()).getTime();
        let self = this;
    var bearOnSnail = setInterval(function() {

        if ((new Date()).getTime() - leftSnail > 2000 && snail.occupied === undefined && intersects(snail.element, self.element)) {
            snail.occupy(self);
        } else if (snail.occupied === self) {
            if (dx.length === 0) {
                return
            }
            if (dx[dx.length - 1] < 0) {
                snail.element.style.left = snail.element.offsetLeft - 1 + "px";
                if (snail.element.className === "snail left") {
                    snail.element.className = "snail left again";
                } else {
                    snail.element.className = "snail left";
                }
            } else {
                snail.element.style.left = snail.element.offsetLeft + 1 + "px";
                if (snail.element.className === "snail right") {
                    snail.element.className = "snail right again";
                } else {
                    snail.element.className = "snail right";
                }
            }
            snail.checkForWin();
            self.element.style.left = snail.element.offsetLeft + (snail.element.offsetWidth / 2) - (self.element.offsetWidth / 2) + "px";
        }

    }, 100);

    this.bearLoop = setInterval(function() {
        let i: number;
        let length: number;
        if (snail.occupied !== self) {
            if (dx.length === 0) {
                self.animateStanding();
            }
            if (dx.length > 0) {
                var currentLeft = self.element.offsetLeft;
                var change = dx[dx.length - 1];

                if (change > 0) {
                    self.animateWalkRight();
                } else {
                    self.animateWalkLeft();
                }

                if (change > 0) {
                    var closestWall;
                    for (i = 0, length = walls.length; i < length; i++) {
                        if (walls[i].offsetTop < self.element.offsetTop && walls[i].offsetTop + walls[i].offsetHeight > self.element.offsetTop) {
                            if (walls[i].offsetLeft >= self.element.offsetLeft + self.element.offsetWidth) {
                                if (closestWall === undefined || walls[i].offsetLeft < closestWall.offsetLeft) {
                                    closestWall = walls[i];
                                }
                            }
                        }
                    }
                    for (i = 0, length = platforms.length; i < length; i++) {
                        if (
                            (platforms[i].offsetTop >= self.element.offsetTop && platforms[i].offsetTop <= self.element.offsetTop + self.element.offsetHeight) ||
                            (platforms[i].offsetTop + platforms[i].offsetHeight >= self.element.offsetTop && platforms[i].offsetTop + platforms[i].offsetHeight <= self.element.offsetTop + self.element.offsetHeight)) {
                                if (platforms[i].offsetLeft >= self.element.offsetLeft + self.element.offsetWidth) {
                                    if (closestWall === undefined || platforms[i].offsetLeft < closestWall.offsetLeft) {
                                        closestWall = platforms[i];
                                    }
                                }
                        }
                    }
                    if (closestWall !== undefined && self.element.offsetLeft + self.element.offsetWidth === closestWall.offsetLeft) {
                    } else if (closestWall !== undefined && self.element.offsetLeft + self.element.offsetWidth + change >= closestWall.offsetLeft) {
                        self.element.style.left = (closestWall.offsetLeft - self.element.offsetWidth) + "px";
                    } else {
                        if (self.element.offsetLeft + self.element.offsetWidth >= 1600) {
                            self.element.style.left = 0 + change + "px";
                        } else {
                            self.element.style.left = self.element.offsetLeft + change + "px";
                        }
                    }
                } else {
                    var closestWall;
                    for (i = 0, length = walls.length; i < length; i++) {
                        if (walls[i].offsetTop < self.element.offsetTop && walls[i].offsetTop + walls[i].offsetHeight > self.element.offsetTop) {
                            if (walls[i].offsetLeft + walls[i].offsetWidth <= self.element.offsetLeft) {
                                if (closestWall === undefined || walls[i].offsetLeft > closestWall.offsetLeft) {
                                    closestWall = walls[i];
                                }
                            }
                        }
                    }
                    for (i = 0, length = platforms.length; i < length; i++) {
                        if (
                            (platforms[i].offsetTop >= self.element.offsetTop && platforms[i].offsetTop <= self.element.offsetTop + self.element.offsetHeight) ||
                            (platforms[i].offsetTop + platforms[i].offsetHeight >= self.element.offsetTop && platforms[i].offsetTop + platforms[i].offsetHeight <= self.element.offsetTop + self.element.offsetHeight)) {
                                if (platforms[i].offsetLeft + platforms[i].offsetWidth <= self.element.offsetLeft) {
                                    if (closestWall === undefined || platforms[i].offsetLeft + platforms[i].offsetWidth > closestWall.offsetLeft + closestWall.offsetWidth) {
                                        closestWall = platforms[i];
                                    }
                                }
                        }
                    }
                    if (closestWall !== undefined && self.element.offsetLeft === closestWall.offsetLeft + closestWall.offsetWidth) {
                    } else if (closestWall !== undefined && self.element.offsetLeft + change <= closestWall.offsetLeft + closestWall.offsetWidth) {
                        self.element.style.left = closestWall.offsetLeft + closestWall.offsetWidth + "px";
                    } else {
                        if (self.element.offsetLeft + change < 0) {
                            self.element.style.left = (1600 - self.element.offsetLeft) + change + "px";
                        } else {
                            self.element.style.left = self.element.offsetLeft + change + "px";
                        }
                    }
                }
            }
        }

        if (dy > 0) {
            let closestPlatform;
            for (i = 0, length = platforms.length; i < length; i++) {
                if (platforms[i].offsetLeft < self.element.offsetLeft + self.element.offsetWidth && platforms[i].offsetLeft + platforms[i].offsetWidth > self.element.offsetLeft) {
                    if (platforms[i].offsetTop >= self.element.offsetTop + self.element.offsetHeight) {
                        if (closestPlatform === undefined || platforms[i].offsetTop < closestPlatform.offsetTop) {
                            closestPlatform = platforms[i];
                        }
                    }
                }
            }
            if (closestPlatform !== undefined && self.element.offsetTop + self.element.offsetHeight === closestPlatform.offsetTop) {
            } else if (closestPlatform !== undefined && self.element.offsetTop + self.element.offsetHeight + 8 >= closestPlatform.offsetTop) {
                self.element.style.top = closestPlatform.offsetTop - self.element.offsetHeight + "px";
            } else if (closestPlatform !== undefined) {
                self.element.style.top = self.element.offsetTop + 8 + "px";
            }
        } else {
            let closestPlatform;
            for (i = 0, length = platforms.length; i < length; i++) {
                if (platforms[i].offsetLeft < self.element.offsetLeft + self.element.offsetWidth && platforms[i].offsetLeft + platforms[i].offsetWidth > self.element.offsetLeft) {
                    if (platforms[i].offsetTop + platforms[i].offsetHeight <= self.element.offsetTop) {
                        if (closestPlatform === undefined || platforms[i].offsetTop + platforms[i].offsetHeight > closestPlatform.offsetTop + closestPlatform.offsetHeight) {
                            closestPlatform = platforms[i];
                        }
                    }
                }
            }
            if (closestPlatform !== undefined && self.element.offsetTop === closestPlatform.offsetTop + closestPlatform.offsetHeight) {
                clearTimeout(jumpTimeout);
                dy = 8;
            } else if (closestPlatform !== undefined && self.element.offsetTop - 8 <= closestPlatform.offsetTop + closestPlatform.offsetHeight) {
                self.element.style.top = closestPlatform.offsetTop + closestPlatform.offsetHeight + "px";
                clearTimeout(jumpTimeout);
                dy = 8;
            } else {
                self.element.style.top = self.element.offsetTop - 8 + "px";
            }
        }

        var touchingBall;
        if (!ballInPocession) {
            if (snail.occupied !== self) {
                for (i = 0, length = balls.length; i < length; i++) {
                    if (balls[i].held === false && intersects(balls[i].element, self.element)) {
                        touchingBall = balls[i];
                        balls[i].held = true;
                        break;
                    }
                }
                if (touchingBall !== undefined) {
                    ballInPocession = touchingBall;
                    touchingBall.held = true;
                }
            }
        } else {
            ballInPocession.element.style.top = self.element.offsetTop - ballInPocession.element.offsetHeight + "px";
            ballInPocession.element.style.left = self.element.offsetLeft + ((self.element.offsetWidth / 2) - (ballInPocession.element.offsetWidth / 2)) + "px";

            for (i = 0, length = gates.length; i < length; i++) {
                if (gates[i].shutting === false && intersects(self.element, gates[i].element)) {
                    ballInPocession.removeFromPlay();
                    ballInPocession = undefined;
                    self.changeToWarrior();
                    gates[i].shut();
                    break;
                }
            }
            if (ballInPocession !== undefined)
            for (i = 0, length = ballHolders.length; i < length; i++) {
                if (ballHolders[i].occupied) {
                    continue;
                }
                var ballHolder = ballHolders[i];
                if (intersects(ballHolder.element, ballInPocession.element)) {
                    ballHolder.occupy(ballInPocession);
                    self.checkForWin();
                    ballInPocession = undefined;
                    break;
                }
            }
        }

    }, 50);

    document.addEventListener("keyup", function(e) {
        if (e.keyCode === leftCode && dx.indexOf(-5) !== -1) {
           dx.splice(dx.indexOf(-5), 1);
           leftDown = false;
        }
        if (e.keyCode === rightCode && dx.indexOf(5) !== -1) {
            dx.splice(dx.indexOf(5), 1);
            rightDown = false;
        }
        if (e.keyCode === jumpCode) {
            dy = 8;
            jumpStart = false;
            clearTimeout(jumpTimeout);
        }
    });
    document.addEventListener("keydown", function(e) {
        if (leftDown === false && e.keyCode === leftCode) {
            dx.push(-5);
            leftDown = true;
        } else if (rightDown === false && e.keyCode === rightCode) {
            dx.push(5);
            rightDown = true;
        } else if (jumpStart === false && e.keyCode === jumpCode) {
            var closestPlatform;
            for (var i = 0, length = platforms.length; i < length; i++) {
                if (platforms[i].offsetLeft < self.element.offsetLeft + self.element.offsetWidth && platforms[i].offsetLeft + platforms[i].offsetWidth > self.element.offsetLeft) {
                    if (platforms[i].offsetTop === self.element.offsetTop + self.element.offsetHeight) {
                        if (snail.occupied === self) {
                            leftSnail = (new Date()).getTime();
                            snail.unoccupy();
                        }
                        jumpStart = true;
                        dy = -16;
                        jumpTimeout = setTimeout(function() {
                            dy = 8;
                        }, 750);
                        break;
                    }
                }
            }
        }
        e.preventDefault();
    });

}
}
