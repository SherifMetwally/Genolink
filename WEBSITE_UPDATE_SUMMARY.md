# GenoLink Website Content Update Summary

## Overview
The GenoLink website has been completely updated to reflect the new focus on **Precision Oncology & Onco-Hematology Diagnostics** across Egypt, GCC, and the Middle East.

---

## Major Changes

### 1. **Hero Section** (components/Hero.tsx)
- **New Headline:** "Precision Oncology & Onco-Hematology Diagnostics Across Egypt, GCC & the Middle East"
- **New Description:** Focus on genomic testing for solid tumors and hematologic malignancies
- **Added CTAs:** 
  - "Submit a Sample" button
  - "Contact Our Team" button
- Removed generic "CREATING THE FUTURE" tagline

### 2. **About Us Section** (components/About.tsx)
Updated all content cards:
- **Who We Are:** Egypt-based precision diagnostics company specializing in Oncology and Onco-Hematology
- **Mission:** Empower clinicians with high-quality genomic insights for personalized cancer care
- **Vision:** Become the leading regional genomics partner for precision oncology and hematology diagnostics
- **Values:** Excellence, Speed, Innovation, Support (with detailed descriptions)

### 3. **Services Section** (components/Services.tsx) - COMPLETELY REWRITTEN
Now features 10 specialized oncology and onco-hematology services:

#### Oncology Services (Solid Tumors):
1. **Comprehensive Solid Tumor Profiling** (Featured)
   - Full DNA + RNA profiling
   - TMB, MSI, Fusions, Copy number variations, LOH
   - Pathway-level therapeutic insights

2. **Tumor-Specific Panels**
   - Breast, Lung, Colorectal, Prostate, Ovarian, Thyroid Cancer
   - Gastrointestinal Tumors

3. **Immunotherapy Biomarkers**
   - PD-L1 IHC
   - MSI / MMR
   - TMB

4. **Liquid Biopsy (ctDNA)**
   - Actionable mutation detection
   - Disease progression monitoring
   - Resistance mechanism identification

5. **Hereditary Cancer Testing**
   - BRCA1/2
   - Multi-gene hereditary cancer panels

#### Onco-Hematology Services:
6. **Leukemia Genomic Panels** (Featured)
   - AML, ALL, CLL, CML
   - FLT3, NPM1, IDH1/2, JAK2, TP53, DNMT3A, and more

7. **Lymphoma Diagnostics**
   - B-cell & T-cell NGS panels
   - BCR/TCR clonality testing
   - Fusions & rearrangements

8. **Myeloma & Plasma Disorders**
   - Myeloma NGS
   - FISH for risk markers

9. **Cytogenetics & FISH**
   - Karyotype analysis
   - Hematologic FISH panels

10. **Minimal Residual Disease (MRD)**
    - NGS-based MRD
    - Flow cytometry MRD

### 4. **Sample Requirements Section** (NEW - components/SampleRequirements.tsx)
Replaces "For Physicians" section with practical information:
- **Oncology Samples:** FFPE blocks, unstained slides, blood samples, saliva/EDTA blood
- **Onco-Hematology Samples:** Bone marrow aspirate, peripheral blood, biopsy blocks, fresh tissue

### 5. **Why Genolink Section** (NEW - components/WhyGenolink.tsx)
Replaces "For Patients" section with key differentiators:
- Egypt-based with regional GCC + Middle East reach
- Partnerships with leading global genomics laboratories
- High analytical sensitivity and clinical-grade reporting
- End-to-end sample logistics across multiple countries
- Scientific support for physicians and tumor boards

### 6. **FAQ Section** (NEW - components/FAQ.tsx)
Expandable FAQ with key information:
- Regions served (Egypt, GCC, wider Middle East)
- Turnaround times:
  - Oncology profiling: 20-25 days
  - Leukemia panels: 10–15 days
  - IHC: 10 days
  - Hereditary testing: 14–21 days
- International sample logistics

### 7. **Contact Section** (components/Contact.tsx) - UPDATED
New contact structure:
- **General Inquiries:** info@genolink.com
- **Medical Support:** clinical@genolink.com
- **Business Partnerships:** businessdevelopment@genolink.com
- **Phone:** +2001144311155
- **Address:** Cairo, Egypt
- Note about additional GCC contact points available

### 8. **Partners Section** (components/Partners.tsx) - UNCHANGED
Kept existing partners:
- Eurofins
- Dante Omics
- Other Leading Partners

---

## Removed Sections
- **For Physicians** → Replaced by "Sample Requirements"
- **For Patients** → Replaced by "Why Genolink"
- **Collaboration** → Content integrated into "Why Genolink"

---

## Navigation Updates (components/Header.tsx)
Updated navigation items:
1. Home
2. About
3. Services
4. Sample Requirements (NEW)
5. Why Genolink (NEW)
6. Partners
7. FAQ (NEW)
8. Contact

---

## Image Requirements

### New Images Needed:
All image prompts have been updated in `IMAGE_GENERATION_PROMPTS.md` to reflect the new oncology/hematology focus.

**Required images:**
- `public/carousel/hero1.png` (16:9)
- `public/carousel/hero2.png` (16:9)
- `public/carousel/hero3.png` (16:9)
- `public/sections/about-us.png`
- `public/sections/services.png`
- `public/sections/sample-requirements.png` (NEW)
- `public/sections/why-genolink.png` (NEW)
- `public/sections/partners.png`
- `public/sections/contact.png`
- `public/backgrounds/about-us-bg.png`
- `public/backgrounds/services-bg.png`
- `public/backgrounds/sample-requirements-bg.png` (NEW)
- `public/backgrounds/why-genolink-bg.png` (NEW)
- `public/backgrounds/partners-bg.png`
- `public/backgrounds/contact-bg.png`

**Existing partner logos:**
- `public/partners/1.png` (Dante Omics)
- `public/partners/2.png` (Eurofins)

---

## Technical Notes

### Files Modified:
- `components/Hero.tsx`
- `components/About.tsx`
- `components/Services.tsx` (complete rewrite)
- `components/Contact.tsx`
- `components/Header.tsx`
- `app/page.tsx`
- `IMAGE_GENERATION_PROMPTS.md`

### Files Created:
- `components/SampleRequirements.tsx`
- `components/WhyGenolink.tsx`
- `components/FAQ.tsx`
- `WEBSITE_UPDATE_SUMMARY.md`

### Files That Can Be Deleted (No longer used):
- `components/ForPhysicians.tsx`
- `components/ForPatients.tsx`
- `components/Collaboration.tsx`

---

## Next Steps

1. **Generate Images:** Use the prompts in `IMAGE_GENERATION_PROMPTS.md` to create all required images
2. **Place Images:** Put generated images in their respective folders
3. **Test Locally:** Run `npm run dev` to test the updated website
4. **Deploy:** Push changes to GitHub to trigger automatic deployment to GitHub Pages

---

## Color Scheme (Unchanged)
- Primary Blue: #025098
- Accent Green: #70993c
- Dark Blue: #082846

---

## Deployment
The website will automatically deploy to GitHub Pages when you push to the `main` branch. The GitHub Actions workflow is already configured.

To deploy:
```bash
git add .
git commit -m "Update website content for oncology and hematology focus"
git push origin main
```

The site will be live at: `https://[username].github.io/GenoLink/`

