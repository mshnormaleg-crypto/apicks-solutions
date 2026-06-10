document.addEventListener('DOMContentLoaded', async () => {
  const loginBtn = document.getElementById('loginBtn');
  const pwdInput = document.getElementById('pwd');
  const loginErr = document.getElementById('loginErr');
  const app = document.getElementById('app');
  const loginEl = document.getElementById('login');
  const logoutBtn = document.getElementById('logoutBtn');

  function showApp() {
    loginEl.classList.add('hidden');
    app.classList.remove('hidden');
  }

  function hideApp() {
    app.classList.add('hidden');
    loginEl.classList.remove('hidden');
  }

  // Simple password gate for prototype
  loginBtn.addEventListener('click', () => {
    const v = (pwdInput.value || '').trim();
    if (v === 'admin') {
      showApp();
      loadData();
    } else {
      loginErr.textContent = 'Invalid password';
    }
  });

  logoutBtn.addEventListener('click', () => {
    hideApp();
  });

  async function loadData() {
    try {
      const [dataRes, messagesRes] = await Promise.all([fetch('data.json'), fetch('messages.json')]);
      const data = await dataRes.json();
      const messages = await messagesRes.json();
      renderStats(data);
      renderCharts(data);
      renderTable(data);
      renderMessages(messages);
    } catch (e) {
      console.error(e);
    }
  }

  function renderMessages(messages) {
    const container = document.getElementById('messagesPanel');
    if (!messages || messages.length === 0) {
      container.innerHTML = '<h3>Messages</h3><p>No messages yet.</p>';
      return;
    }
    const rows = messages.map(msg => `
      <div class="message-item">
        <div class="message-header"><strong>${msg.name}</strong> · ${msg.date}</div>
        <div><strong>Email:</strong> ${msg.email} · <strong>Phone:</strong> ${msg.phone}</div>
        <p>${msg.message}</p>
      </div>
    `).join('');
    container.innerHTML = `<h3>Messages</h3>${rows}`;
  }

  function renderStats(data) {
    const leadsSum = data.leads.reduce((a,b)=>a+b,0);
    const callsSum = data.calls.reduce((a,b)=>a+b,0);
    document.getElementById('leadsTotal').textContent = leadsSum;
    document.getElementById('callsTotal').textContent = callsSum;
    document.getElementById('apptsTotal').textContent = data.appointments;
    document.getElementById('revenueTotal').textContent = '$' + data.revenue.toLocaleString();
  }

  function renderCharts(data) {
    const labels = data.labels;
    const ctx1 = document.getElementById('leadsChart').getContext('2d');
    new Chart(ctx1, {type:'line',data:{labels, datasets:[{label:'Leads',data:data.leads,backgroundColor:'rgba(19,127,63,0.12)',borderColor:'#137f3f',tension:0.3}]},options:{responsive:true}});

    const ctx2 = document.getElementById('callsChart').getContext('2d');
    new Chart(ctx2, {type:'bar',data:{labels, datasets:[{label:'Calls',data:data.calls,backgroundColor:'#1b9c57'}]},options:{responsive:true}});
  }

  function renderTable(data){
    const container = document.getElementById('dataTable');
    const rows = data.labels.map((d,i)=>`<tr><td>${d}</td><td>${data.leads[i]}</td><td>${data.calls[i]}</td></tr>`).join('');
    container.innerHTML = `<h3>Daily details</h3><table><thead><tr><th>Date</th><th>Leads</th><th>Calls</th></tr></thead><tbody>${rows}</tbody></table>`;
  }
});
