import math
from statistics import median

def mean_or_none(values):
    """Return mean of list or None if empty."""
    return round(sum(values) / len(values), 3) if values else None


def std_or_none(values):
    """Return sample standard deviation or None if <2 values."""
    if len(values) < 2:
        return None
    m = sum(values) / len(values)
    var = sum((x - m) ** 2 for x in values) / (len(values) - 1)
    return round(math.sqrt(var), 3)


def median_or_none(values):
    """Return median or None if empty."""
    return round(median(values), 3) if values else None


def min_or_none(values):
    """Return min or None if empty."""
    return min(values) if values else None


def max_or_none(values):
    """Return max or None if empty."""
    return max(values) if values else None


def count_or_zero(values):
    """Return count of values or 0."""
    return len(values) if values else 0


def ci_95(values):
    """Return 95% confidence interval (low, high) or (None, None) if insufficient data."""
    n = len(values)
    if n < 2:
        return (None, None)
    mean_val = sum(values) / n
    std_val = math.sqrt(sum((x - mean_val) ** 2 for x in values) / (n - 1))
    se = std_val / math.sqrt(n)
    margin = 1.96 * se  # 95% confidence
    low = round(mean_val - margin, 3)
    high = round(mean_val + margin, 3)
    return (low, high)


def cv_or_none(values):
    """Return coefficient of variation (std/mean) or None if undefined."""
    m = mean_or_none(values)
    s = std_or_none(values)
    if not m or not s:
        return None
    return round(s / m, 3)
