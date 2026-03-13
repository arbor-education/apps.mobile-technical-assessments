## Pull request checklist

#### Overview

<!--
Briefly describe your changes for a technical audience, explaining what you
changed and why it was done this way.
-->

### Type of change
<!-- Please try to limit your pull request to one type, submit multiple pull requests if needed. --> 

- [ ] Feature
- [ ] Bugfix
- [ ] Nonfunctional (e.g., performance)
- [ ] Refactoring (no functional changes)
- [ ] Code formatting only
- [ ] Documentation only
- [ ] Build or developer tooling
- [ ] Other (please describe):

### Change level
<!-- choose one -->

- [ ] Major: All users will notice changes
- [ ] Minor: Significant new functionality
- [ ] Patch: Most users will not notice any difference

<!--
If this introduces a breaking change, please describe the impact and migration
path for existing applications below.
-->

### Change impact

#### Manual testing required?

- [ ] Yes
- [ ] No

#### Impact assessment
<!--
Give a bullet point for each functional area affected by the change and state
the level of risk, e.g:

 * intentionally changed (as requested on the ticket)
 * affected by this change (any known, unavoidable side-effect. Details should
   be given on the ticket)
 * high risk of regression
 * moderate risk of regression
 * low risk of regression

Write n/a if there are none.
-->

*

#### Native Modules changes?
<!--
Have we changed any native code in this PR? If so we can't release as OTA update,
and need to do full app store release instead. A common case this happens is when
adding a new expo package, or doing an SDK upgrade

Write n/a if there are none.
-->

*

#### Multi-device risk assessment
<!-- choose one -->

- [ ] n/a (no manual testing required)
- [ ] Very low risk (multi-device testing not essential)
- [ ] Low risk (quick check on common device types)
- [ ] Normal risk (at least a quick check on many devices)
- [ ] High risk (detailed testing on as many devices as possible)

#### Special risks
<!--
Note any special risks, such as certain screen sizes, hardware support, etc. Write
n/a if there are none.
-->

*

### Final checks

#### This change is covered by automated tests:
<!-- choose one -->

- [ ] Yes
- [ ] n/a
- [ ] No (please explain why):

#### This change includes all necessary documentation updates:
<!-- choose one -->

- [ ] Yes
- [ ] n/a
- [ ] No (please explain why):
