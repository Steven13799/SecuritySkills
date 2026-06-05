# BENIGN — sast-config CWE coverage tiering
# Expected: NO High/Medium gap finding.
#
# Project languages: Python + JavaScript (no C/C++).
# SAST rule set covers the high-confidence CWEs (79 XSS, 89 SQLi, 78 cmd-inj,
# 22 path-traversal). It has ZERO rules for:
#   - CWE-352 (CSRF)  -> framework/runtime property, low SAST confidence
#   - CWE-787 / CWE-416 / CWE-125 (OOB write/UAF/OOB read) -> C/C++ only
#
# Pre-1.0.1 the skill flagged "0 rules for a CWE Top 10" as High, producing a
# false finding for CSRF/OOB on a Python/JS project. With confidence tiering,
# these are recorded as informational with a complementary-control note
# (framework CSRF token, DAST), NOT as a SAST gap finding.

coverage:
  CWE-79: { rules: 3, confidence: high, status: covered }
  CWE-89: { rules: 2, confidence: high, status: covered }
  CWE-78: { rules: 1, confidence: high, status: covered }
  CWE-22: { rules: 1, confidence: high, status: covered }
  CWE-352: { rules: 0, confidence: low,  status: informational }   # not a gap finding
  CWE-787: { rules: 0, confidence: low,  status: informational }   # C/C++ only; N/A here
