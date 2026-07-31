package gg.drift.core.render;

public class ScreenPosition {
    private double x;
    private double y;
    private double scale;

    public ScreenPosition(double x, double y) {
        this(x, y, 1.0);
    }

    public ScreenPosition(double x, double y, double scale) {
        this.x = x;
        this.y = y;
        this.scale = scale;
    }

    public double getX() { return x; }
    public double getY() { return y; }
    public double getScale() { return scale; }

    public void setX(double x) { this.x = x; }
    public void setY(double y) { this.y = y; }
    public void setScale(double scale) { this.scale = scale; }

    public ScreenPosition copy() {
        return new ScreenPosition(x, y, scale);
    }

    public ScreenPosition withOffset(double dx, double dy) {
        return new ScreenPosition(x + dx, y + dy, scale);
    }

    public static ScreenPosition fromAnchor(AnchorPoint anchor, double screenWidth, double screenHeight, double padding) {
        return switch (anchor) {
            case TOP_LEFT -> new ScreenPosition(padding, padding);
            case TOP_RIGHT -> new ScreenPosition(screenWidth - padding, padding);
            case BOTTOM_LEFT -> new ScreenPosition(padding, screenHeight - padding);
            case BOTTOM_RIGHT -> new ScreenPosition(screenWidth - padding, screenHeight - padding);
            case CENTER -> new ScreenPosition(screenWidth / 2, screenHeight / 2);
        };
    }
}
