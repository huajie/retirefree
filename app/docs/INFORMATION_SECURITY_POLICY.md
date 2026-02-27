# Information Security Policy

**Document Owner:** Founder/CEO
**Last Reviewed:** February 26, 2026
**Review Frequency:** Quarterly
**Version:** 1.0

---

## 1. Purpose

This Information Security Policy establishes the framework for protecting RetireFree's information assets, customer data, and systems from unauthorized access, use, disclosure, disruption, modification, or destruction.

Our security program is designed to:
- Protect customer financial data and personal information
- Maintain customer trust and confidence
- Comply with applicable laws and regulations (GDPR, CCPA)
- Meet third-party security requirements (Plaid, financial institutions)
- Enable secure business operations

---

## 2. Scope

This policy applies to:
- All information systems and data owned or managed by RetireFree
- All employees, contractors, and third-party service providers with access to RetireFree systems
- All customer data collected through our application
- All financial data accessed via Plaid integration
- Cloud infrastructure and services (Vercel, Supabase)

---

## 3. Data Classification

All data must be classified according to sensitivity:

### 3.1 Public
- Marketing materials
- Public website content
- Published blog posts
- Open-source code (if any)
- **Handling:** No special protections required

### 3.2 Internal
- Internal documentation
- Business plans and strategies
- Non-sensitive user analytics
- **Handling:** Access restricted to employees

### 3.3 Confidential
- User email addresses and account information
- Calculator inputs and retirement plans
- Application logs containing user activity
- Source code and proprietary algorithms
- **Handling:** Encrypted at rest, access logged, need-to-know basis

### 3.4 Restricted (Highest Sensitivity)
- Financial account data (balances, transactions)
- Plaid access tokens and credentials
- Authentication tokens and passwords
- Social Security Numbers (if collected)
- **Handling:** Encrypted in transit and at rest, strict access controls, audit logs required

---

## 4. Access Control

### 4.1 Principle of Least Privilege
- Users granted minimum access necessary for job functions
- Access reviewed monthly and revoked when no longer needed
- No shared accounts or credentials

### 4.2 Authentication Requirements

**Production Systems:**
- Multi-factor authentication (MFA/2FA) required for:
  - GitHub repository access
  - Vercel deployment platform
  - Supabase database console
  - Domain registrar
  - Plaid dashboard
  - Email accounts

**Password Requirements:**
- Minimum 12 characters
- Combination of uppercase, lowercase, numbers, symbols
- No reuse of previous 5 passwords
- Password managers encouraged

**Application Users:**
- Minimum 8 characters for customer accounts
- 2FA available and encouraged
- Session timeout after 30 days of inactivity

### 4.3 Access Review
- Monthly review of all production system access
- Quarterly review of service provider access
- Immediate revocation upon employee termination or role change

---

## 5. Data Protection

### 5.1 Encryption

**Data in Transit:**
- TLS 1.3 required for all external connections
- HTTPS enforced for all web traffic (automatic redirect)
- Database connections use SSL/TLS
- API calls to Plaid use HTTPS with certificate pinning

**Data at Rest:**
- Database encryption: AES-256 (Supabase managed)
- Plaid access tokens: Encrypted database columns
- Environment variables: Encrypted secrets management (Vercel)
- Backups: Encrypted by cloud provider

### 5.2 Data Minimization
- Collect only data necessary for core functionality
- Transaction history limited to 90 days
- No storage of Social Security Numbers
- No storage of bank login credentials (handled by Plaid)

### 5.3 Data Retention

| Data Type | Retention Period | Deletion Method |
|-----------|------------------|-----------------|
| Active user data | While account active | N/A |
| Inactive accounts (no login) | 2 years | Automatic purge |
| Deleted accounts | 30 days (soft delete) | Permanent deletion |
| Backup data | 90 days | Overwritten |
| Application logs | 90 days | Automatic rotation |
| Security logs | 1 year | Automatic rotation |
| Transaction data | 2 years or account deletion | Permanent deletion |

### 5.4 Data Deletion
- User-initiated: Account deletion within 30 days
- Plaid tokens immediately revoked upon account deletion
- Backup copies purged within 90 days
- GDPR/CCPA deletion requests honored within 30 days

---

## 6. Infrastructure Security

### 6.1 Cloud Security

**Vercel (Application Hosting):**
- SOC 2 Type II certified
- Automatic DDoS protection
- Built-in WAF (Web Application Firewall)
- Automatic HTTPS and security headers
- Edge network for performance and security

**Supabase (Database & Auth):**
- SOC 2 Type II certified
- Row Level Security (RLS) policies enforced
- Automated backups with encryption
- Database connection pooling with SSL
- Audit logging enabled

**Plaid (Financial Data):**
- SOC 2, ISO 27001, PCI DSS certified
- Bank-level encryption
- OAuth 2.0 authentication
- No storage of user credentials

### 6.2 Network Segmentation
- Frontend isolated from backend via serverless architecture
- Database accessible only via authenticated API
- Secrets stored separately from code (environment variables)
- User data isolated via RLS policies (database-level security)

### 6.3 Security Headers
All pages include security headers:
- Content-Security-Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (HSTS)
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (disabled camera, microphone, geolocation)

---

## 7. Application Security

### 7.1 Secure Development Practices
- Code reviews required before merging to main branch
- Automated security scanning (Dependabot, npm audit)
- Input validation on all user inputs
- SQL injection prevention (parameterized queries)
- XSS prevention (React auto-escaping, CSP headers)
- CSRF protection (SameSite cookies, token validation)

### 7.2 Dependency Management
- Weekly automated dependency scans (Dependabot)
- High-severity vulnerabilities patched within 7 days
- Critical vulnerabilities patched within 24 hours
- Dependency updates reviewed before deployment

### 7.3 API Security
- Rate limiting on all API endpoints
- Authentication required for sensitive operations
- Input validation and sanitization
- Error messages don't leak sensitive information
- API keys stored in encrypted environment variables

---

## 8. Monitoring & Logging

### 8.1 Security Monitoring
- Real-time error tracking (Sentry planned)
- Uptime monitoring (5-minute intervals)
- Failed login attempt tracking
- Unusual access pattern detection
- Database query performance monitoring

### 8.2 Audit Logging

**Events Logged:**
- User authentication (login, logout, failures)
- Account creation and deletion
- Plaid token exchange and revocation
- API access to financial data
- Configuration changes
- Security incidents

**Log Retention:**
- Application logs: 90 days
- Security logs: 1 year
- Audit logs: 1 year

**Log Protection:**
- Logs stored separately from application
- Access to logs requires authentication
- No PII in log messages (user IDs only)
- Logs encrypted at rest

---

## 9. Incident Response

### 9.1 Security Incident Definition
Any event that compromises:
- Confidentiality, integrity, or availability of data
- Unauthorized access to systems or data
- Data breach or potential data breach
- Service disruption or DDoS attack
- Malware or security vulnerability exploitation

### 9.2 Severity Levels

**Critical:**
- Data breach affecting customer financial data
- Unauthorized access to production database
- Complete service outage
- **Response Time:** 1 hour

**High:**
- Potential data breach (investigation required)
- Unauthorized access attempt to production systems
- Vulnerability with active exploit
- **Response Time:** 4 hours

**Medium:**
- Security vulnerability discovered (no active exploit)
- Failed access attempts (potential brute force)
- Service degradation
- **Response Time:** 24 hours

**Low:**
- Minor security issues
- Informational security alerts
- **Response Time:** 7 days

### 9.3 Response Process
See [INCIDENT_RESPONSE_PLAN.md](./INCIDENT_RESPONSE_PLAN.md) for detailed procedures.

---

## 10. Third-Party Security

### 10.1 Vendor Assessment
Before engaging a vendor with access to customer data:
1. Review security certifications (SOC 2, ISO 27001)
2. Verify data processing agreement (DPA) in place
3. Confirm encryption standards (TLS 1.2+, AES-256)
4. Check data breach notification procedures
5. Review vendor's security policies

### 10.2 Current Approved Vendors

| Vendor | Purpose | Certification | DPA | Review Date |
|--------|---------|---------------|-----|-------------|
| Vercel | Hosting & CDN | SOC 2 Type II | Yes | 2026-02-26 |
| Supabase | Database & Auth | SOC 2 Type II | Yes | 2026-02-26 |
| Plaid | Financial Data | SOC 2, ISO 27001 | Yes | 2026-02-26 |

### 10.3 Vendor Monitoring
- Annual review of vendor security practices
- Monitor vendor security bulletins
- Review vendor access quarterly
- Immediate revocation if vendor compromised

---

## 11. Employee Security

### 11.1 Security Awareness Training
- Annual security training required for all team members
- Topics covered:
  - Phishing and social engineering
  - Password security and MFA
  - Data handling procedures
  - Incident reporting
  - GDPR and CCPA compliance

### 11.2 Acceptable Use
Employees must:
- Use strong, unique passwords
- Enable 2FA on all production systems
- Never share credentials
- Report security incidents immediately
- Lock workstations when unattended
- Use encrypted disk storage (FileVault, BitLocker)

Employees must not:
- Share production credentials
- Access customer data without business need
- Use personal devices for production access (without MDM)
- Disable security features
- Download customer data to personal devices

### 11.3 Background Checks
- Criminal background checks for all employees with production access
- Employment and reference verification
- Ongoing monitoring for high-privilege accounts

---

## 12. Compliance

### 12.1 Regulatory Requirements

**GDPR (European Union):**
- Lawful basis for processing (consent, legitimate interest)
- Right to access, rectification, erasure, portability
- Data breach notification within 72 hours
- Privacy by design and default
- Data Processing Agreements with vendors

**CCPA (California):**
- Right to know what data is collected
- Right to delete personal information
- Right to opt-out of sale (we don't sell data)
- Non-discrimination for exercising rights
- Privacy policy disclosure requirements

### 12.2 Compliance Monitoring
- Quarterly privacy policy review
- Annual compliance audit
- Regular data inventory updates
- Vendor compliance verification

---

## 13. Physical Security

### 13.1 Device Security (Solo Founder)
- Full disk encryption enabled (FileVault on MacBook)
- Automatic screen lock after 5 minutes
- Strong password/biometric authentication
- Automatic security updates enabled
- Antivirus software installed
- No customer data stored on local device

### 13.2 Future Team Growth
When hiring employees:
- Implement Mobile Device Management (MDM)
- Require company-issued devices for production access
- Remote wipe capability for lost/stolen devices
- Physical security measures for office (if applicable)

---

## 14. Business Continuity

### 14.1 Backup Strategy
- **Database:** Automated daily backups (Supabase)
- **Code:** Version control (GitHub) with daily commits
- **Configuration:** Infrastructure as code, version controlled
- **Backup Testing:** Quarterly restoration tests

### 14.2 Disaster Recovery
- **Recovery Time Objective (RTO):** 4 hours
- **Recovery Point Objective (RPO):** 24 hours
- **Procedures:**
  1. Restore database from latest backup
  2. Redeploy application from GitHub
  3. Verify all services operational
  4. Notify users of any data loss

---

## 15. Policy Review & Updates

### 15.1 Review Schedule
- Quarterly review by founder/security lead
- Annual comprehensive review
- Immediate review after security incident
- Review when adding new services or features

### 15.2 Change Management
- All policy changes documented with version number
- Material changes communicated to team
- User-facing changes reflected in Privacy Policy
- Compliance team review (when applicable)

---

## 16. Roles & Responsibilities

| Role | Responsibility |
|------|----------------|
| Founder/CEO | Overall security accountability, policy approval |
| Lead Developer (same person currently) | Implementation of security controls, incident response |
| Future Security Lead | Daily security operations, monitoring, audits |
| All Team Members | Follow security policies, report incidents |

---

## 17. Exceptions

Any exceptions to this policy must:
1. Be documented in writing
2. Include business justification
3. Have compensating controls
4. Be approved by founder/security lead
5. Be reviewed quarterly

---

## 18. Policy Violations

Violations may result in:
- Retraining and coaching
- Revocation of access privileges
- Termination of employment
- Legal action (if criminal)

---

## 19. Contact

**Security Questions:** security@retirefree.app
**Report Security Issue:** security@retirefree.app
**Privacy Questions:** privacy@retirefree.app

---

## Appendices

- [Incident Response Plan](./INCIDENT_RESPONSE_PLAN.md)
- [Privacy Policy](/privacy) (user-facing)
- [Terms of Service](/terms) (user-facing)
- [Plaid Security Questionnaire Answers](../PLAID_SECURITY_REVIEW_ANSWERS.md)

---

**Document History:**

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-02-26 | Initial policy creation | Founder |

**Next Review Date:** May 26, 2026
