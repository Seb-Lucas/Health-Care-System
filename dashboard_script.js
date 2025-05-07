// Sample data for appointments
const upcomingAppointments = [
    {
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "May 8, 2025",
      time: "10:00 AM - 10:30 AM",
      location: "Heartcare Medical Center",
      img: "https://randomuser.me/api/portraits/women/50.jpg",
      status: "Upcoming"
    },
    {
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "May 15, 2025",
      time: "2:30 PM - 3:00 PM",
      location: "Skin Health Clinic",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      status: "Upcoming"
    },
    {
      doctor: "Dr. Emily Wilson",
      specialty: "Neurologist",
      date: "May 22, 2025",
      time: "11:15 AM - 12:00 PM",
      location: "Neuroscience Center",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      status: "Upcoming"
    }
  ];
  
  const pastAppointments = [
    {
      doctor: "Dr. Robert Thompson",
      specialty: "Family Medicine",
      date: "April 28, 2025",
      time: "9:00 AM",
      status: "Completed",
      img: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      doctor: "Dr. Jessica Martinez",
      specialty: "Ophthalmologist",
      date: "April 15, 2025",
      time: "2:30 PM",
      status: "Completed",
      img: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      doctor: "Dr. David Kim",
      specialty: "Orthopedic Surgeon",
      date: "March 30, 2025",
      time: "11:15 AM",
      status: "Completed",
      img: "https://randomuser.me/api/portraits/men/60.jpg"
    },
    {
      doctor: "Dr. Amanda Lee",
      specialty: "Pediatrician",
      date: "March 22, 2025",
      time: "10:00 AM",
      status: "Cancelled",
      img: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      doctor: "Dr. Richard Brown",
      specialty: "Endocrinologist",
      date: "March 10, 2025",
      time: "1:45 PM",
      status: "Completed",
      img: "https://randomuser.me/api/portraits/men/70.jpg"
    }
  ];
  
  let currentPage = 1;
  const rowsPerPage = 5;
  
  function renderUpcomingAppointments() {
    const container = document.getElementById('appointmentsCards');
    container.innerHTML = '';
    upcomingAppointments.forEach((appt, idx) => {
      const card = document.createElement('div');
      card.className = 'appointment-card';
      card.innerHTML = `
        <div class="doctor-info">
          <img src="${appt.img}" alt="${appt.doctor}">
          <div class="doctor-details">
            <b>${appt.doctor}</b>
            <span>${appt.specialty}</span>
          </div>
        </div>
        <div class="badge">${appt.status}</div>
        <div style="margin-top:8px;">
          <div>📅 ${appt.date}</div>
          <div>⏰ ${appt.time}</div>
          <div>🏥 ${appt.location}</div>
        </div>
        <div class="actions">
          <button onclick="alert('Reschedule for ${appt.doctor}')">Reschedule</button>
          <button class="cancel" onclick="cancelAppointment(${idx})">Cancel</button>
        </div>
      `;
      card.onclick = () => alert(`Viewing details for ${appt.doctor}`);
      container.appendChild(card);
    });
  }
  
  function cancelAppointment(idx) {
    if (confirm(`Cancel appointment with ${upcomingAppointments[idx].doctor}?`)) {
      upcomingAppointments.splice(idx, 1);
      document.getElementById('upcomingAppointments').textContent = upcomingAppointments.length;
      renderUpcomingAppointments();
    }
  }
  
  function renderPastAppointments(page = 1, filter = '') {
    const tbody = document.getElementById('pastAppointmentsTable');
    tbody.innerHTML = '';
    let filtered = pastAppointments.filter(appt =>
      appt.doctor.toLowerCase().includes(filter.toLowerCase()) ||
      appt.specialty.toLowerCase().includes(filter.toLowerCase())
    );
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    filtered.slice(start, end).forEach(appt => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${appt.img}" alt="${appt.doctor}">${appt.doctor}</td>
        <td>${appt.specialty}</td>
        <td>${appt.date}</td>
        <td>${appt.time}</td>
        <td class="status-${appt.status.toLowerCase()}">${appt.status}</td>
        <td><a href="#" onclick="alert('Book again with ${appt.doctor}');return false;">Book Again</a></td>
      `;
      tbody.appendChild(tr);
    });
    document.getElementById('pageInfo').textContent = page;
  }
  
  document.getElementById('searchPast').addEventListener('input', function() {
    renderPastAppointments(1, this.value);
  });
  
  document.getElementById('prevPage').onclick = function() {
    if (currentPage > 1) {
      currentPage--;
      renderPastAppointments(currentPage, document.getElementById('searchPast').value);
    }
  };
  document.getElementById('nextPage').onclick = function() {
    currentPage++;
    renderPastAppointments(currentPage, document.getElementById('searchPast').value);
  };
  
  document.getElementById('viewCard').onclick = function() {
    this.classList.add('active');
    document.getElementById('viewList').classList.remove('active');
    document.getElementById('appointmentsCards').style.display = 'flex';
  };
  document.getElementById('viewList').onclick = function() {
    this.classList.add('active');
    document.getElementById('viewCard').classList.remove('active');
    document.getElementById('appointmentsCards').style.display = 'block';
  };
  
  document.getElementById('bookBtn').onclick = function() {
    alert('Redirect to book new appointment page!');
  };
  
  window.onload = function() {
    renderUpcomingAppointments();
    renderPastAppointments();
  };