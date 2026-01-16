import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

function Billing() {
  const [activeTab, setActiveTab] = useState("overview");
  const [filterStatus, setFilterStatus] = useState("all");

  // Billing stats
  const billingStats = [
    { label: "Total Revenue", value: "$245.8K", change: "+18%", icon: "💰" },
    { label: "Pending Bills", value: "$23.4K", change: "-5%", icon: "⏳" },
    { label: "Payments Received", value: "$14,568", change: "+1%", icon: "✅" },
    { label: "Insurance Claims", value: "156", change: "+8%", icon: "🏥" },
  ];

  // Revenue data
  const revenueData = [
    { month: "Jan", revenue: 42500, claims: 85, patients: 420 },
    { month: "Feb", revenue: 39800, claims: 78, patients: 380 },
    { month: "Mar", revenue: 45200, claims: 92, patients: 450 },
    { month: "Apr", revenue: 51800, claims: 105, patients: 520 },
    { month: "May", revenue: 48500, claims: 98, patients: 480 },
    { month: "Jun", revenue: 55200, claims: 112, patients: 550 }
  ];

  // Invoices
  const invoices = [
    { id: "INV-001", patient: "Taigo Wilkinson", date: "2024-05-15", amount: "$568.56", status: "paid", type: "Insurance" },
    { id: "INV-002", patient: "Samantha Williams", date: "2024-05-14", amount: "$324.80", status: "pending", type: "Out-of-pocket" },
    { id: "INV-003", patient: "Amy White", date: "2024-05-13", amount: "$215.40", status: "paid", type: "Insurance" },
    { id: "INV-004", patient: "Tyler Young", date: "2024-05-12", amount: "$465.40", status: "overdue", type: "Insurance" },
    { id: "INV-005", patient: "Robert Brown", date: "2024-05-11", amount: "$189.75", status: "paid", type: "Out-of-pocket" },
    { id: "INV-006", patient: "Lisa Johnson", date: "2024-05-10", amount: "$246.65", status: "pending", type: "Insurance" },
  ];

  // Insurance claims
  const insuranceClaims = [
    { id: "CLM-001", patient: "Taigo Wilkinson", provider: "Blue Cross", amount: "$568.56", status: "approved", submitted: "2024-05-10" },
    { id: "CLM-002", patient: "Samantha Williams", provider: "Aetna", amount: "$324.80", status: "pending", submitted: "2024-05-09" },
    { id: "CLM-003", patient: "Amy White", provider: "UnitedHealth", amount: "$215.40", status: "approved", submitted: "2024-05-08" },
    { id: "CLM-004", patient: "Tyler Young", provider: "Cigna", amount: "$465.40", status: "rejected", submitted: "2024-05-07" },
    { id: "CLM-005", patient: "Robert Brown", provider: "Medicare", amount: "$189.75", status: "approved", submitted: "2024-05-06" },
  ];

  // Payment methods
  const paymentMethods = [
    { method: "Insurance", amount: "$156,400", percentage: 63.6, color: "#3b82f6" },
    { method: "Out-of-pocket", amount: "$64,200", percentage: 26.1, color: "#10b981" },
    { method: "Credit Card", amount: "$15,800", percentage: 6.4, color: "#f59e0b" },
    { method: "Cash", amount: "$9,400", percentage: 3.9, color: "#8b5cf6" },
  ];

  const filteredInvoices = invoices.filter(invoice => {
    if (filterStatus === "all") return true;
    return invoice.status === filterStatus;
  });

  return (
    <div className="billing-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Billing & Invoices</h1>
          <p className="subtitle">Manage patient billing, insurance claims, and financial reports</p>
        </div>
        <div className="billing-actions">
          <button className="primary-button">+ New Invoice</button>
          <button className="secondary-button">📊 Generate Report</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {billingStats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-header">
              <span className="stat-icon">{stat.icon}</span>
              <h3>{stat.label}</h3>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.change.includes('+') ? 'positive' : 'negative'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="billing-tabs">
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>Overview</button>
        <button className={activeTab === "invoices" ? "active" : ""} onClick={() => setActiveTab("invoices")}>Invoices</button>
        <button className={activeTab === "claims" ? "active" : ""} onClick={() => setActiveTab("claims")}>Insurance Claims</button>
        <button className={activeTab === "reports" ? "active" : ""} onClick={() => setActiveTab("reports")}>Financial Reports</button>
      </div>

      {/* Main Content */}
      <div className="billing-content">
        {activeTab === "overview" && (
          <div className="overview-grid">
            {/* Revenue Chart */}
            <div className="chart-card large">
              <div className="card-header">
                <h3>Revenue Overview</h3>
                <div className="time-selector">
                  <button className="active">6M</button>
                  <button>1Y</button>
                  <button>3Y</button>
                </div>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue ($)" />
                    <Line type="monotone" dataKey="claims" stroke="#10b981" strokeWidth={2} name="Insurance Claims" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="payment-methods-card">
              <h3>Payment Methods</h3>
              <div className="methods-list">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="method-item">
                    <div className="method-info">
                      <div className="method-name">{method.method}</div>
                      <div className="method-amount">{method.amount}</div>
                    </div>
                    <div className="method-bar">
                      <div 
                        className="bar-fill" 
                        style={{ 
                          width: `${method.percentage}%`,
                          background: method.color
                        }}
                      ></div>
                    </div>
                    <div className="method-percentage">{method.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats-card">
              <h3>Quick Stats</h3>
              <div className="stats-grid-small">
                <div className="stat-item">
                  <div className="stat-label">Avg. Payment Time</div>
                  <div className="stat-value">14.2 days</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Claim Approval Rate</div>
                  <div className="stat-value">87.5%</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Outstanding Balance</div>
                  <div className="stat-value">$8,245</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Collections Rate</div>
                  <div className="stat-value">94.8%</div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="transactions-card">
              <div className="card-header">
                <h3>Recent Transactions</h3>
                <button className="view-all">View all →</button>
              </div>
              <div className="transactions-list">
                {invoices.slice(0, 4).map(invoice => (
                  <div key={invoice.id} className="transaction-item">
                    <div className="transaction-info">
                      <div className="transaction-id">{invoice.id}</div>
                      <div className="transaction-patient">{invoice.patient}</div>
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-amount">{invoice.amount}</div>
                      <span className={`transaction-status ${invoice.status}`}>{invoice.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "invoices" && (
          <div className="invoices-tab">
            {/* Invoice Filters */}
            <div className="invoice-filters">
              <div className="filter-tabs">
                <button className={filterStatus === "all" ? "active" : ""} onClick={() => setFilterStatus("all")}>All</button>
                <button className={filterStatus === "paid" ? "active" : ""} onClick={() => setFilterStatus("paid")}>Paid</button>
                <button className={filterStatus === "pending" ? "active" : ""} onClick={() => setFilterStatus("pending")}>Pending</button>
                <button className={filterStatus === "overdue" ? "active" : ""} onClick={() => setFilterStatus("overdue")}>Overdue</button>
              </div>
              <div className="search-box">
                <input type="text" placeholder="Search invoices..." />
                <span className="search-icon">🔍</span>
              </div>
            </div>

            {/* Invoices Table */}
            <div className="invoices-table">
              <table>
                <thead>
                  <tr>
                    <th>Invoice ID</th>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map(invoice => (
                    <tr key={invoice.id}>
                      <td>{invoice.id}</td>
                      <td>
                        <div className="patient-cell">
                          <div className="patient-avatar-small">
                            {invoice.patient.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div className="patient-name">{invoice.patient}</div>
                        </div>
                      </td>
                      <td>{invoice.date}</td>
                      <td className="amount">{invoice.amount}</td>
                      <td>
                        <span className={`invoice-type ${invoice.type.toLowerCase().replace('-', '')}`}>
                          {invoice.type}
                        </span>
                      </td>
                      <td>
                        <span className={`invoice-status ${invoice.status}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <div className="invoice-actions">
                          <button className="action-button view">👁️</button>
                          <button className="action-button edit">✏️</button>
                          <button className="action-button download">📥</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Invoice Summary */}
            <div className="invoice-summary">
              <div className="summary-item">
                <div className="summary-label">Total Invoices</div>
                <div className="summary-value">{filteredInvoices.length}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Total Amount</div>
                <div className="summary-value">
                  ${filteredInvoices.reduce((sum, inv) => sum + parseFloat(inv.amount.replace('$', '')), 0).toFixed(2)}
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Average Invoice</div>
                <div className="summary-value">
                  ${(filteredInvoices.reduce((sum, inv) => sum + parseFloat(inv.amount.replace('$', '')), 0) / filteredInvoices.length || 0).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "claims" && (
          <div className="claims-tab">
            <h3>Insurance Claims Management</h3>
            <div className="claims-table">
              <table>
                <thead>
                  <tr>
                    <th>Claim ID</th>
                    <th>Patient</th>
                    <th>Provider</th>
                    <th>Amount</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {insuranceClaims.map(claim => (
                    <tr key={claim.id}>
                      <td>{claim.id}</td>
                      <td>{claim.patient}</td>
                      <td>{claim.provider}</td>
                      <td className="amount">{claim.amount}</td>
                      <td>{claim.submitted}</td>
                      <td>
                        <span className={`claim-status ${claim.status}`}>
                          {claim.status}
                        </span>
                      </td>
                      <td>
                        <div className="claim-actions">
                          <button className="action-button">📋 Details</button>
                          {claim.status === "pending" && <button className="action-button">🔄 Resubmit</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Billing;