# Complete Executive Guide: Workforce Intelligence & People Analytics PoC

---

## 1. The Updated Message to Your Leader (Send via Teams or Email)

### Option A: Teams Chat Version (Conversational & Punchy)
```text
Hey [Name], following up on my earlier note—to be clear, I want to make sure we do this by the book from day one. I'm not going to run any manual or unapproved software on my laptop that could raise security questions.

Instead, I stood up a live proof-of-concept directly in our M365 tenant on our Workforce Transformation Test SharePoint page so you can see the interactive data flow today. 

That said, this exercise confirmed why we need the proper SPFx (SharePoint Framework) developer workflow rather than Power Apps:

1. Visual Quality & Control: Power Apps is trapped inside a clunky, boxed-in iframe with rigid SharePoint template frames. SPFx gives us full-page, edge-to-edge modern SaaS design (or a dedicated full-screen app inside Microsoft Teams) with zero clunk.
2. Agentic Velocity: Power Apps requires slow, manual drag-and-drop clicking that cannot be automated. SPFx is 100% code-driven, meaning we can use AI agentic tools (Claude Code, etc.) to build, customize, and maintain tools in minutes instead of weeks.

I’m excited to show you the live test page today. Once we align on the direction, we can submit the standard developer profile ticket to IT to get our official SPFx environment stood up!
```

### Option B: Email Version (Structured)
```text
Subject: Update: Workforce Intelligence Hub PoC & Technical Architecture

Hi [Name],

Following up on my earlier note regarding local software setup—I want to ensure our project adheres strictly to IT governance from day one. I will not be running any manual or unapproved installations on my workstation that could conflict with security policies.

In the meantime, I built a live proof-of-concept directly inside our Microsoft 365 tenant on our Workforce Transformation Test SharePoint page so you can see a functioning dashboard with active filters today.

While this proves we can host internal tools within our M365 perimeter, building it highlighted why SPFx (SharePoint Framework) is the right path forward rather than relying on Power Apps:

• SaaS-Grade UI vs. Clunky Embeds: Power Apps embeds feel boxed into awkward template frames with double scrollbars. SPFx unlocks true Full-Page App capabilities—allowing us to build sleek, modern interfaces that look like dedicated SaaS tools, or deploy them directly as full-screen apps pinned inside Microsoft Teams.
• Agentic Development Velocity: Power Apps relies on manual UI clicking in a browser designer. SPFx is 100% code-based (React/TypeScript), which allows us to leverage AI agentic workflows (like Claude Code) to scaffold, refactor, and ship new tools for HR teams 10x faster.

I look forward to walking you through the test page and our high-fidelity prototype. Once we align, I have the standard IT request ready to submit for our permanent developer tooling.

Best,
[Your Name]
```

---

## 2. Live Power App in SharePoint (3-Minute Setup, 100% Cloud, Zero Installs)

This runs entirely in your web browser. No local admin rights, downloads, or IT tickets needed. Instead of creating a dozen manual cards, you insert **only 3 controls**.

### Step 1: Create the Canvas App
1. Go to **https://make.powerapps.com** and sign in with your corporate account.
2. In the left navigation, click **+ Create** ➔ choose **Blank app** ➔ **Blank canvas app**.
3. Name it: `Workforce Intelligence Hub`.
4. Format: Select **Tablet** (widescreen). Click **Create**.

### Step 2: Insert the 3 Controls

#### Control 1: Department Filter (Dropdown)
1. Click **+ Insert** ➔ **Drop down**.
2. Position it at the top right of the screen.
3. In the formula bar at the top, set its **`Items`** property to:
   ```powerfx
   ["All Departments", "Engineering", "Sales", "Operations", "HR"]
   ```

#### Control 2: The 4 Styled KPI Cards in ONE Box (HTML Text)
1. Click **+ Insert** ➔ search for **HTML text** (under *Display*).
2. Position it across the screen just below the dropdown.
3. Set its **Height** to `135` (set all Padding properties to `0` to prevent scrollbars).
4. In the formula bar, replace the **`HtmlText`** property with this exact code:
   ```powerfx
   "<div style='display:flex; gap:16px; font-family:Segoe UI, sans-serif; width:100%;'>
     
     <div style='background:white; border:1px solid #E2E8F0; border-radius:10px; padding:16px; flex:1; box-shadow:0 1px 3px rgba(0,0,0,0.06);'>
       <div style='font-size:11px; font-weight:700; color:#64748B; text-transform:uppercase;'>Total Headcount</div>
       <div style='font-size:28px; font-weight:800; color:#0F172A; margin:4px 0;'>" & 
         Switch(Dropdown1.Selected.Value, "Engineering", "420", "Sales", "310", "Operations", "280", "HR", "95", "1,420") & 
       "</div>
       <div style='font-size:12px; font-weight:600; color:#16A34A;'>↑ +4.2% Growth</div>
     </div>

     <div style='background:white; border:1px solid #E2E8F0; border-radius:10px; padding:16px; flex:1; box-shadow:0 1px 3px rgba(0,0,0,0.06);'>
       <div style='font-size:11px; font-weight:700; color:#64748B; text-transform:uppercase;'>Annualized Attrition</div>
       <div style='font-size:28px; font-weight:800; color:#0F172A; margin:4px 0;'>" & 
         Switch(Dropdown1.Selected.Value, "Engineering", "6.2%", "Sales", "11.4%", "Operations", "7.8%", "HR", "4.1%", "8.4%") & 
       "</div>
       <div style='font-size:12px; font-weight:600; color:#16A34A;'>↓ Controlled</div>
     </div>

     <div style='background:white; border:1px solid #E2E8F0; border-radius:10px; padding:16px; flex:1; box-shadow:0 1px 3px rgba(0,0,0,0.06);'>
       <div style='font-size:11px; font-weight:700; color:#64748B; text-transform:uppercase;'>Open Requisitions</div>
       <div style='font-size:28px; font-weight:800; color:#0F172A; margin:4px 0;'>" & 
         Switch(Dropdown1.Selected.Value, "Engineering", "18", "Sales", "14", "Operations", "8", "HR", "3", "46") & 
       "</div>
       <div style='font-size:12px; color:#64748B;'>Active Pipeline</div>
     </div>

     <div style='background:white; border:1px solid #E2E8F0; border-radius:10px; padding:16px; flex:1; box-shadow:0 1px 3px rgba(0,0,0,0.06);'>
       <div style='font-size:11px; font-weight:700; color:#64748B; text-transform:uppercase;'>Offer Acceptance</div>
       <div style='font-size:28px; font-weight:800; color:#0F172A; margin:4px 0;'>" & 
         Switch(Dropdown1.Selected.Value, "Engineering", "93.1%", "Sales", "84.5%", "Operations", "88.0%", "HR", "95.5%", "89.2%") & 
       "</div>
       <div style='font-size:12px; font-weight:600; color:#16A34A;'>↑ Top Tier</div>
     </div>

   </div>"
   ```

#### Control 3: The Dynamic Column Chart
1. Click **+ Insert** ➔ search for **Column chart**.
2. Place it beneath the HTML cards and resize it across the bottom half of the screen.
3. In the top formula bar, set its **`Items`** property to:
   ```powerfx
   Switch(
       Dropdown1.Selected.Value,
       "Engineering", Table({Role: "Frontend", Attrition: 5.4}, {Role: "Backend", Attrition: 6.8}, {Role: "Data/AI", Attrition: 4.9}, {Role: "DevOps", Attrition: 7.2}),
       "Sales", Table({Role: "Enterprise", Attrition: 9.2}, {Role: "Mid-Market", Attrition: 12.4}, {Role: "SMB", Attrition: 14.1}),
       "Operations", Table({Role: "Logistics", Attrition: 7.2}, {Role: "Facilities", Attrition: 6.8}, {Role: "Compliance", Attrition: 5.9}),
       "HR", Table({Role: "Talent Acq", Attrition: 4.5}, {Role: "Total Rewards", Attrition: 3.2}, {Role: "HRBP", Attrition: 4.0}),
       /* Default for All Departments */
       Table({Role: "Engineering", Attrition: 6.2}, {Role: "Sales", Attrition: 11.4}, {Role: "Operations", Attrition: 7.8}, {Role: "HR", Attrition: 4.1})
   )
   ```

### Step 3: Save, Publish & Embed in SharePoint
1. Click the **Save** icon (top right) ➔ click the **Publish** icon ➔ **Publish this version**.
2. Click the back arrow `<-` to return to `make.powerapps.com/apps`.
3. Click the `...` next to your app ➔ **Details** ➔ copy the **App ID** or the **Web link**.
4. Open your **Workforce Transformation Test** SharePoint page in your browser.
5. Click **Edit** (top right) ➔ click **`+` (Add a web part)** ➔ choose **Power Apps**.
6. In the right panel, paste your **App ID** or **Web link**.
7. Click **Republish** (top right).

---

## 3. High-Fidelity Standalone Prototype (`workforce_prototype.html`)

The standalone file is located at `workforce_prototype.html`. Open it directly in **Microsoft Edge**. It features:
* Real-time dynamic updates on **both charts** and **KPIs** when toggling departments.
* Line and Area headcount forecasting over 12 months.
* Detailed sub-discipline attrition breakdowns per department.
* Modern Microsoft Fluent / Teams card design.

---

## 4. Leader Meeting Script & Walkthrough

Follow this 3-step conversation flow in your meeting:

1. **Show the Live SharePoint Page (The Power App):**
   * *"Here is our live Workforce Transformation Test SharePoint page. I stood up this initial proof-of-concept directly in Microsoft 365 to prove we can host interactive tools right inside our corporate perimeter today with zero software downloads or infrastructure costs."*
2. **Explain the Limitation of Power Apps & Show the Prototype:**
   * *"However, as you can see, Power Apps embeds are visually boxed into SharePoint template frames and require manual drag-and-drop clicking that can't be automated. This standalone prototype (`workforce_prototype.html`) shows what true modern web development looks like: edge-to-edge UI, instant response, and clean styling."*
3. **Pitch the SPFx Path (The Strategic Value):**
   * *"To build and scale workforce intelligence tools efficiently, the industry standard is SPFx (SharePoint Framework):*
     * *1. UI Freedom: It removes the clunky template frames and gives us true Full-Page Apps (or a dedicated full-screen app pinned inside Microsoft Teams).*
     * *2. Agentic Velocity: Because SPFx is pure code, we can leverage AI coding agents (Claude Code) to build and maintain new tools in hours instead of weeks.*
     * *3. Next Step: We submit a standard developer profile ticket to IT for Node.js v22 LTS and a Site Collection App Catalog on our site."*

---

## 5. The Ready-to-Send IT Request Ticket

Copy and paste this into your IT Helpdesk / Service Desk portal:

```text
Subject: Developer Tools Request (Node v22 LTS) & Site Collection App Catalog for [Site Name]

Hi IT Support / Desktop Engineering Team,

In my tech implementation and workforce intelligence role, I am developing internal analytics and productivity web parts for the HR team using Microsoft's supported SharePoint Framework (SPFx).

To support this development on my workstation, I request approval for:
1. Node.js v22 (LTS): Approved installation via Company Portal / Software Center, or authorization to execute Node v22 in my user profile.
2. PowerShell Script Execution: Permission to run locally signed scripts (Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser).
3. VS Code (if not already provisioned).

Additionally, to allow us to deploy and test departmental tools locally without requiring tenant-wide administrative rights, please enable a Site Collection App Catalog on our site:
Target Site: https://<your-company>.sharepoint.com/sites/WorkforceTransformationTest

(SharePoint Admin Reference: This can be enabled via SharePoint Online PowerShell using:
Add-SPOSiteCollectionAppCatalog -Site https://<your-company>.sharepoint.com/sites/WorkforceTransformationTest)

Thank you!
```

---

## 6. Architecture & Access Control Rules

1. **Centralized Hub:** Host all tools on a single dedicated SharePoint site (e.g., `/sites/WorkforceToolsHub`). You only need the Site Collection App Catalog enabled once on that single site.
2. **Granular Access Control:** Put each tool on its own page (e.g., `/SitePages/ExecutiveCompensation.aspx`). Break permission inheritance on that specific page (**Page details** ➔ **Manage Access** ➔ **Stop Inheriting Permissions**) to restrict access strictly to authorized M365 Security Groups.
