# AlgebraicFactoring.com – QA & Growth Notes  
_A concise, share-ready briefing_

---

## 1. Quick Test Matrix  

| Expression | Expected Factors | Result | Status |
|------------|------------------|--------|--------|
| `x^2 − 4` | `(x−2)(x+2)` | Correct | ✅ |
| `x^2 + 5x + 6` | `(x+2)(x+3)` | Correct | ✅ |
| `4x^4 + 4x^2 + 1` | `(2x^2+1)²` | **Unchanged** | ❌ |
| `x^6 − 7x^3 + 12` | `(x^3−4)(x^3−3)` | **Unchanged** | ❌ |
| `x^5 + x^4+…+1` | `(x+1)(x²−x+1)(x²+x+1)` | Wrong signs | ⚠️ |
| `6x²−12xy+6y²` | `6(x−y)²` | Correct | ✅ |
| `3x³y²−12x²y²+9xy²` | `3xy²(x−1)(x−3)` | GCF missing | ⚠️ |

---

## 2. Functional Issues  

* **On-blur bug** – Must click outside the input or press `Tab` before **Factor Expression**; otherwise previous expression is submitted.  
* **Occasional CSS drop-out** – Stylesheet sometimes fails; “Show Steps” button then collapses.  
* **GCF handling** – Some multivariable / high-degree polynomials return partially factored forms.  
* **Sign errors** – Certain cyclotomic-style polynomials (`x⁵+…+1`) produce incorrect signs.  

---

## 3. Feature Gaps & Fixes  

| Area | Fix / Enhancement |
|------|-------------------|
| Input UX | Trigger factoring on **Enter** or **button click** without losing focus. |
| Algebra engine |   * Always extract GCF first. <br>  * Add perfect-power detection (e.g. `(2x²+1)²`). <br> * Improve high-degree rational root search. |
| Step-by-step | Guarantee the **Show Steps** modal works; outline GCF → pattern → grouping path. |
| Mobile UI | Verify responsive layout; large buttons & monospace font for math. |
| Accessibility | Alt-text for icons; ARIA labels; persist dark-mode toggle. |

---

## 4. Educational Content Tweaks  

* **Tips & Tricks** – Great start.  Add quick mnemonics for cubes & fourth powers.  
* **Common Mistakes** – Include “drops constant term” and “mis-grouping” examples.  
* **Patterns** – Expand with “sum of cubes”, “quadratic in disguise”, “factor by substitution”.  
* **Practice tab** –  
  * Tag questions as _Basic / Intermediate / Challenge_.  
  * Auto-check answers and award stars.  

---

## 5. Engagement & Marketing Playbook  

| Tactic | Action Bite |
|--------|-------------|
| Gamification | Points, badges, streaks; leaderboard for classes. |
| Personalized drills | Level selector (HS, College); adaptive hints. |
| Short-form video | 15-sec TikTok / Reels solving textbook problems. |
| Teacher portal | Class code, assignment sets, progress CSV export. |
| SEO blog | Weekly post: “Factor Friday” walk-through. |
| Email / push | Weekly challenge; notify on new badge. |
| Social proof | Student testimonials + before/after grades. |

---

## 6. Road-map Snapshot  

| Sprint | Deliverable |
|--------|-------------|
| **1** | Input-field bug fix • CSS fallback • Full GCF routine |
| **2** | Perfect-power detector • Step-by-step modal rev 1 |
| **3** | Badge & streak system • Mobile polish |
| **4** | Teacher dashboard MVP • Content calendar go-live |

---

_Compiled for internal review – ready to paste into Claude Code or other tooling._