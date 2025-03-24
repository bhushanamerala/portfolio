// Skill section animations
document.addEventListener('DOMContentLoaded', function() {
  // Animate elements when they come into view
  const animateOnScroll = function() {
    // Skill bars
    const skillProgress = document.querySelectorAll('.skill-progress');
    skillProgress.forEach(progress => {
      const position = progress.getBoundingClientRect().top;
      if (position < window.innerHeight - 100) {
        const width = progress.getAttribute('data-width');
        progress.style.width = width;
      }
    });
    
    // Circular progress
    const circleProgress = document.querySelectorAll('.progress-bar');
    circleProgress.forEach(circle => {
      const position = circle.getBoundingClientRect().top;
      const percent = circle.getAttribute('data-percent');
      if (position < window.innerHeight - 100) {
        const dashoffset = 283 - (283 * percent / 100);
        circle.style.setProperty('--percent', percent);
        circle.style.strokeDashoffset = dashoffset;
      }
    });
    
    // Star ratings
    const starRatings = document.querySelectorAll('.filled-stars');
    starRatings.forEach(stars => {
      const position = stars.getBoundingClientRect().top;
      if (position < window.innerHeight - 100) {
        stars.style.width = stars.style.width;
      }
    });
  };
  
  // Run on page load
  setTimeout(animateOnScroll, 300);
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});

// Timeline Animation
document.addEventListener('DOMContentLoaded', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  }
  
  // Function to add animation classes
  function animateTimelineItems() {
    timelineItems.forEach(item => {
      if (isInViewport(item) && !item.classList.contains('animated')) {
        item.classList.add('animated');
        item.style.opacity = 1;
      }
    });
  }
  
  // Initially hide timeline items
  timelineItems.forEach(item => {
    item.style.opacity = 0;
  });
  
  // Run once on load
  setTimeout(animateTimelineItems, 300);
  
  // Run on scroll
  window.addEventListener('scroll', animateTimelineItems);
});

// Project section functionality
document.addEventListener('DOMContentLoaded', function() {
  // Project filtering functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Filter projects when buttons are clicked
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Get the filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter the projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          // Add animation for appearing
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Project thumbnail and modal enhancements
  projectCards.forEach(card => {
    // Add glowing effect to project thumbnails on hover
    card.addEventListener('mouseenter', function() {
      // Stagger the hover glowing animation
      setTimeout(() => {
        this.querySelector('.project-thumbnail').classList.add('hover-glow');
      }, 50);
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('.project-thumbnail').classList.remove('hover-glow');
    });
  });
  
  // Enhanced modal opening with dynamic content loading
  const detailButtons = document.querySelectorAll('.project-details-btn');
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content-container');
  
  detailButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the project ID from data attribute
      const projectId = this.getAttribute('data-project');
      
      // Simulate loading project details from data
      const projectDetails = getProjectDetails(projectId);
      
      // Populate modal with project details
      populateModalContent(projectDetails);
      
      // Show modal with animation
      modal.style.display = 'block';
      setTimeout(() => {
        modal.classList.add('show');
      }, 10);
      
      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal
  const closeModal = document.querySelector('.close-modal');
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      closeProjectModal();
    });
  }
  
  // Also close when clicking outside modal
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeProjectModal();
    }
  });
  
  function closeProjectModal() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
  
  // Function to get project details (simulated data)
  function getProjectDetails(projectId) {
    // This simulates fetching project data
    // In a real application, this could come from an API or data file
    const projectsData = {
      project1: {
        title: "E-Commerce Platform",
        image: "pro.jpeg",
        description: "A comprehensive e-commerce solution built with React and Node.js. This platform includes product browsing, search functionality, shopping cart, user accounts, payment processing, order tracking, and an admin dashboard.",
        challenges: "Implemented real-time inventory updates and optimized database queries to handle high transaction volumes.",
        features: [
          "Responsive UI for all devices",
          "User authentication with JWT",
          "Real-time inventory updates",
          "Secure payment processing",
          "Admin dashboard with analytics"
        ],
        technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "JWT", "Stripe API", "AWS S3"],
        demoLink: "#",
        codeLink: "#"
      },
      project2: {
        title: "Fitness Tracker App",
        image: "pro.jpeg",
        description: "Mobile application for tracking workouts, setting fitness goals, and monitoring progress over time.",
        challenges: "Designed an efficient local storage system for offline functionality while ensuring seamless sync when connection is restored.",
        features: [
          "Custom workout plans",
          "Progress visualization",
          "Social sharing features",
          "Offline functionality",
          "Integration with health devices"
        ],
        technologies: ["React Native", "Firebase", "Expo", "Redux", "Chart.js", "Google Fit API"],
        demoLink: "#",
        codeLink: "#"
      },
      // Additional projects would be defined here
    };
    
    // Return the requested project or a default if not found
    return projectsData[projectId] || {
      title: "Project Details",
      image: "pro.jpeg",
      description: "Project information will be available soon.",
      technologies: []
    };
  }
  
  // Function to populate modal with project content
  function populateModalContent(project) {
    let techHTML = '';
    if (project.technologies) {
      project.technologies.forEach(tech => {
        techHTML += `<span class="tech-tag">${tech}</span>`;
      });
    }
    
    let featuresHTML = '';
    if (project.features) {
      featuresHTML = '<ul>';
      project.features.forEach(feature => {
        featuresHTML += `<li>${feature}</li>`;
      });
      featuresHTML += '</ul>';
    }
    
    const content = `
      <div class="project-details-header">
        <h2>${project.title}</h2>
        <div class="project-links">
          <a href="${project.demoLink || '#'}" class="project-link" target="_blank"><i class="icon">🔗</i> Live Demo</a>
          <a href="${project.codeLink || '#'}" class="project-link" target="_blank"><i class="icon">💻</i> Source Code</a>
        </div>
      </div>
      <div class="project-details-content">
        <div class="project-image-slider">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-description">
          <h3>Project Overview</h3>
          <p>${project.description}</p>
          
          ${project.challenges ? `<h3>Technical Challenges</h3><p>${project.challenges}</p>` : ''}
          
          ${project.features ? `<h3>Key Features</h3>${featuresHTML}` : ''}
          
          <h3>Technologies Used</h3>
          <div class="tech-stack">
            ${techHTML}
          </div>
        </div>
      </div>
    `;
    
    modalContent.innerHTML = content;
  }
  
  // Animation on scroll for project cards
  function animateProjectCards() {
    projectCards.forEach((card, index) => {
      const cardPosition = card.getBoundingClientRect().top;
      
      if (cardPosition < window.innerHeight - 100) {
        // Staggered animation
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }
  
  // Initialize project cards
  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Run animation on load and scroll
  setTimeout(animateProjectCards, 300);
  window.addEventListener('scroll', animateProjectCards);
});

// Chat functionality
document.addEventListener('DOMContentLoaded', function() {
  // Chat elements
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-message');
  const clearButton = document.getElementById('clear-chat');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');
  
  // Sample responses database
  // In a real implementation, this could be expanded or connected to an API
  const responses = {
    greetings: [
      "Hello! How can I help you today?",
      "Hi there! I'm AI Bhushana. What would you like to know about my work?",
      "Greetings! Feel free to ask me anything about my projects or skills."
    ],
    experience: [
      "I have over 8 years of experience in software engineering. I've worked at Google and Amazon, where I led development teams and architected solutions used by millions of users worldwide. My expertise spans full-stack development with a focus on scalable applications.",
      "My professional journey includes working at tech giants like Google and Amazon, where I've developed enterprise-level solutions. I've also contributed significantly to open-source projects and the React Native framework."
    ],
    skills: [
      "My strongest technical skills include JavaScript, Python, and React for frontend development. I'm also proficient in Node.js, Express, and MongoDB for backend work. Beyond coding, I excel in team leadership, problem-solving, and communication.",
      "I specialize in full-stack development with expertise in React, Node.js, and Python. I'm also skilled in cloud architecture using AWS and have experience with machine learning technologies. My soft skills include team leadership and project management."
    ],
    projects: [
      "I've worked on various projects including an e-commerce platform, a fitness tracking app, and payment gateway APIs. My most notable project was optimizing the AWS Lambda service, which reduced deployment time by 40%.",
      "Some of my key projects include an AI-powered image recognition service, real-time analytics dashboards, and mobile applications. I've also made significant contributions to the React Native core library."
    ],
    contact: [
      "You can reach me through the contact form at the bottom of this page, or connect with me on LinkedIn or GitHub. I'm always open to discussing new opportunities and collaborations.",
      "Feel free to send me a message using the contact form below. I typically respond within 24-48 hours. You can also check out my GitHub for code samples."
    ],
    education: [
      "I have a Master of Science in Computer Science from MIT, where I specialized in Artificial Intelligence and Machine Learning. Before that, I completed my Bachelor's degree at Stanford University.",
      "I studied at MIT for my Master's degree in Computer Science with a focus on AI, and at Stanford for my undergraduate studies. My thesis on Neural Network Approaches to Natural Language Understanding received departmental honors."
    ],
    default: [
      "That's an interesting question. While I'm just an AI representation, the real Bhushana would be happy to discuss this further if you reach out through the contact form.",
      "I'm afraid I don't have specific information about that. The real Bhushana would be able to provide a more detailed response if you contact them directly.",
      "Great question! This would be something best discussed directly with Bhushana. Feel free to use the contact form below to reach out."
    ]
  };
  
  // Function to add a user message to the chat
  function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    
    const currentTime = new Date();
    const timeString = currentTime.getHours() + ':' + 
                      (currentTime.getMinutes() < 10 ? '0' : '') + 
                      currentTime.getMinutes();
    
    messageDiv.innerHTML = `
      <div class="message-content">
        <div class="message-text">
          <p>${text}</p>
        </div>
        <div class="message-time">${timeString}</div>
      </div>
      <div class="message-avatar">
        <img src="cp.jpeg" alt="User">
      </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Function to add an assistant message to the chat
  function addAssistantMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    
    const currentTime = new Date();
    const timeString = currentTime.getHours() + ':' + 
                      (currentTime.getMinutes() < 10 ? '0' : '') + 
                      currentTime.getMinutes();
    
    messageDiv.innerHTML = `
      <div class="message-avatar">
        <img src="cp.jpeg" alt="AI Bhushana">
      </div>
      <div class="message-content">
        <div class="message-text">
          <p>${text}</p>
        </div>
        <div class="message-time">${timeString}</div>
      </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Function to show typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant typing-message';
    typingDiv.innerHTML = `
      <div class="message-avatar">
        <img src="cp.jpeg" alt="AI Bhushana">
      </div>
      <div class="typing-indicator">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
  }
  
  // Function to determine the appropriate response category
  function getResponseCategory(message) {
    message = message.toLowerCase();
    
    if (message.match(/hi|hello|hey|greetings/)) {
      return 'greetings';
    } else if (message.match(/experience|work|job|career|background|history/)) {
      return 'experience';
    } else if (message.match(/skills|technologies|languages|frameworks|abilities|expertise|good at/)) {
      return 'skills';
    } else if (message.match(/projects|portfolio|work|built|developed|created/)) {
      return 'projects';
    } else if (message.match(/contact|email|reach|get in touch|connect|message/)) {
      return 'contact';
    } else if (message.match(/education|study|degree|university|college|school|learn/)) {
      return 'education';
    } else {
      return 'default';
    }
  }
  
  // Function to generate a response based on user input
  function generateResponse(userMessage) {
    // This is where you would integrate with a real AI API like OpenAI
    // For now, we'll use our predefined responses
    
    // Determine which category the message falls into
    const category = getResponseCategory(userMessage);
    
    // Get a random response from that category
    const possibleResponses = responses[category];
    const randomIndex = Math.floor(Math.random() * possibleResponses.length);
    
    return possibleResponses[randomIndex];
    
    // When integrating with a real API like OpenAI, you would:
    // 1. Make an API call to the service
    // 2. Send the user's message along with context about Bhushana
    // 3. Process and return the response
    /*
    async function getRealAIResponse(message) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY_HERE'
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: "You are AI Bhushana, a virtual representation of software engineer Bhushana Merala. Respond as if you were Bhushana talking about your experience, skills, and projects."
              },
              {
                role: "user",
                content: message
              }
            ],
            max_tokens: 150
          })
        });
        
        const data = await response.json();
        return data.choices[0].message.content;
      } catch (error) {
        console.error('Error fetching AI response:', error);
        return "I'm having trouble connecting right now. Please try again later or use the contact form to reach out directly.";
      }
    }
    */
  }
  
  // Handle sending a message
  function handleSendMessage() {
    const userMessage = chatInput.value.trim();
    
    if (userMessage === '') return;
    
    // Add user message to chat
    addUserMessage(userMessage);
    
    // Clear input field
    chatInput.value = '';
    
    // Show typing indicator
    const typingIndicator = showTypingIndicator();
    
    // Simulate AI thinking time (1-2 seconds)
    setTimeout(() => {
      // Remove typing indicator
      typingIndicator.remove();
      
      // Generate and add AI response
      const aiResponse = generateResponse(userMessage);
      addAssistantMessage(aiResponse);
    }, Math.random() * 1000 + 1000); // Random delay between 1-2 seconds
  }
  
  // Send message on button click
  sendButton.addEventListener('click', handleSendMessage);
  
  // Send message on Enter key
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  });
  
  // Handle suggestion chips
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', function() {
      const suggestionText = this.getAttribute('data-text');
      chatInput.value = suggestionText;
      handleSendMessage();
    });
  });
  
  // Clear chat history
  clearButton.addEventListener('click', function() {
    // Keep only the first welcome message
    while (chatMessages.children.length > 1) {
      chatMessages.removeChild(chatMessages.lastChild);
    }
  });
});

// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
  const dismissButtons = document.querySelectorAll('.dismiss-btn');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Collect form data
      const formData = {
        name: this.elements.name.value,
        email: this.elements.email.value,
        subject: this.elements.subject.value,
        message: this.elements.message.value
      };
      
      // Here you would normally send the form data to your server or a service like Formspree
      // For demonstration purposes, we'll simulate a successful submission
      
      // Simulate form submission with 50% success rate
      const isSuccess = Math.random() > 0.5;
      
      setTimeout(() => {
        if (isSuccess) {
          // Show success message
          formSuccess.classList.remove('hidden');
          contactForm.reset();
        } else {
          // Show error message
          formError.classList.remove('hidden');
        }
      }, 1500);
      
      /* 
      // Example of an actual form submission using fetch
      fetch('your-form-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          formSuccess.classList.remove('hidden');
          contactForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        formError.classList.remove('hidden');
      });
      */
    });
  }
  
  // Handle dismissing success/error messages
  dismissButtons.forEach(button => {
    button.addEventListener('click', function() {
      const messageEl = this.closest('.form-message');
      if (messageEl) {
        messageEl.classList.add('hidden');
      }
    });
  });
}); 