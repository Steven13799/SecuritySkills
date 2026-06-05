# VULNERABLE — sast-config suppression review
# Expected: Finding (High). A bare `# nosemgrep` (no rule id) disables ALL rules
# on that line, not just the intended one -> silent coverage hole. The fix is to
# require rule-scoped suppression: `# nosemgrep: <rule-id> -- <justification>`.
import subprocess


def run(cmd):
    # BAD: blanket suppression hides any/all findings on this line, including
    # the command-injection that should be caught here.
    return subprocess.call(cmd, shell=True)  # nosemgrep


def run_ok(cmd):
    # GOOD (for contrast): rule-scoped + justified.
    return subprocess.run(  # nosemgrep: python.lang.security.audit.subprocess-shell-true -- cmd is a fixed allowlist value
        cmd, shell=True
    )
