# Quick Test Instructions

## Test the New Sample Data (362 entities + 300+ relationships)

### IMPORTANT: First Time Setup

If you have tested the application before, you need to clear old data from localStorage:

### Method 1: Use Settings Page (Recommended)
1. Open http://localhost:5174/ (or 5173)
2. Click **Settings** in the left menu
3. Click **"Reset to Initial Data"** button
4. Confirm the reset
5. Page will reload with all sample data loaded

### Method 2: Browser DevTools
1. Press F12 to open DevTools
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Local Storage** > http://localhost:5174
4. Right-click on `nis2-entities` and select Delete
5. Right-click on `nis2-relationships` and select Delete
6. Refresh the page (F5)

## What to Test

### 1. Dashboard
- Should show **362 total entities**
- 14 entity types displayed
- Statistics for applications, infrastructure, security, etc.

### 2. Entity Browser
- Select **ApplicationSystem** - should show **100 applications**
- Select **InfrastructureNode** - should show **40 infrastructure nodes**
- Select **SecurityControl** - should show **50 security controls**
- Try searching for "ERP", "CRM", "Payment", etc.

### 3. Visualizer
- Click **Visualizer** in menu
- Should render a complex graph with **362 nodes** and **300+ edges**
- **Note:** Initial layout may take 5-10 seconds due to complexity
- Try:
  - Zoom in/out (mouse wheel)
  - Pan (drag canvas)
  - Click nodes to see details
  - Filter by type (e.g., only ApplicationSystem)
  - Search for specific entities

### 4. Relationship Manager
- Should show **300+ relationships**
- Try filtering by type:
  - `hosted_on` - ~120 relationships
  - `depends_on` - ~80 relationships
  - `protects` - ~45 relationships
  - `supports` - ~35 relationships
  - `mitigates` - ~25 relationships
- Search for specific entities (e.g., "ERP", "SIEM", "CRM")

### 5. Entity Details
- Click any entity from Entity Browser
- Should show:
  - Full entity information
  - All relationships (incoming and outgoing)
  - Related entities
- Try adding a new relationship:
  - Select source entity
  - Select target entity
  - Should only show VALID relationship types based on metamodel
  - Try selecting entities where no valid relationship exists - should show warning

### 6. Test Metamodel Validation
Try creating these VALID relationships:
- ApplicationSystem → hosted_on → InfrastructureNode ✅
- ApplicationSystem → supports → BusinessProcess ✅
- SecurityControl → protects → ApplicationSystem ✅
- SecurityControl → mitigates → ThreatScenario ✅
- DataStore → stores → DataObject ✅

Try creating these INVALID relationships (should be blocked):
- DataObject → hosted_on → ApplicationSystem ❌
- BusinessProcess → protects → SecurityControl ❌
- Person → threatens → ApplicationSystem ❌

### 7. Export/Import
- Go to Settings
- Click **"Export Data"**
- Should download JSON file (~1 MB)
- Open in text editor and verify:
  - `entities` array has 362 items
  - `relationships` array has 300+ items
- Try Import with the exported file (should work)

### 8. Compliance View
- Should show NIS 2, GDPR, ISO 27001, PCI DSS, SOX, etc.
- Each requirement should have entities mapped to it
- Example: Click "NIS 2" - should show critical applications

## Expected Performance

- **Page Load:** < 2 seconds
- **Graph Rendering (362 nodes):** 5-10 seconds for initial layout
- **Entity Browse:** Instant
- **Search:** < 100ms
- **localStorage Size:** ~500-800 KB
- **Memory Usage:** ~100-150 MB in browser

## Troubleshooting

### Issue: Only seeing 3-5 entities
**Solution:** Old data in localStorage. Use Method 1 or 2 above to reset.

### Issue: Graph takes forever to load
**Solution:** Normal for 362 nodes. Wait 10-15 seconds. If still not loading, check browser console (F12) for errors.

### Issue: "Invalid relationship" errors when adding relationships
**Solution:** This is correct behavior! The metamodel validation is working. Only certain relationship types are allowed between specific entity types.

### Issue: Changes not persisting after page refresh
**Solution:** Check that localStorage is not disabled in browser settings.

## Sample Data Highlights

### Notable Entities to Explore:
- **ERP System** (app-001): Core business system with many relationships
- **Customer Portal** (app-003): Public-facing with security controls
- **Payment Gateway** (app-007): Critical system with PCI DSS compliance
- **IAM System** (app-021): Security infrastructure protecting other apps
- **SIEM** (app-023): Security monitoring with threat detection
- **Mobile Banking App** (app-036): Customer-facing with multiple security layers

### Notable Relationships:
- ERP → integrated with → CRM, Finance, Portal
- Payment Gateway → protected by → Multiple security controls
- SIEM → detects → Ransomware, DDoS, etc.
- Critical apps → comply with → NIS 2, GDPR, PCI DSS

## Next Steps

After testing:
1. Explore different entity types
2. Trace relationships (e.g., follow dependencies from Customer Portal)
3. Check security coverage (which apps are protected by which controls)
4. Review compliance mappings
5. Try exporting and importing data
6. Add your own entities and relationships
7. Use the Visualizer to understand the architecture

## Questions?

See SAMPLE_DATA_README.md for more detailed information about the data structure and content.
