import { jsPDF } from 'jspdf';
import { resumeData } from './resumeData';

export function generateResumePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // A4 dimensions: 210 x 297 mm
  const marginX = 18; // Left/Right margin
  let y = 16;         // Start cursor y

  // Color constants (monochrome/professional dark gray)
  const colorPrimary = '#000000';
  const colorSecondary = '#222222';
  const colorMuted = '#444444';
  const colorSeparator = '#bbbbbb';

  // Set font family to Times (academic, serif, very professional)
  doc.setFont('times', 'normal');

  // --- HEADER SECTION ---
  // Name (Centered, Bold, Large)
  doc.setTextColor(colorPrimary);
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.text(resumeData.name, 105, y, { align: 'center' });
  y += 5.5;

  // Subtitle: Title
  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(colorSecondary);
  doc.text(resumeData.title, 105, y, { align: 'center' });
  y += 5.5;

  // Contact Info Line
  doc.setFontSize(9.5);
  doc.setTextColor(colorSecondary);

  const contactText = `${resumeData.phone}   |   ${resumeData.email}   |   ${resumeData.linkedin}   |   ${resumeData.github}`;
  doc.text(contactText, 105, y, { align: 'center' });

  // Add click links on the contact text
  const phoneX = 64;
  const emailX = 85;
  const linkedinX = 130;
  const githubX = 146;
  
  doc.link(phoneX, y - 3, 20, 4, { url: `tel:+91${resumeData.phone}` });
  doc.link(emailX, y - 3, 38, 4, { url: `mailto:${resumeData.email}` });
  doc.link(linkedinX, y - 3, 14, 4, { url: resumeData.linkedinUrl });
  doc.link(githubX, y - 3, 12, 4, { url: resumeData.githubUrl });

  y += 5;

  // Helper to draw a section header and a solid horizontal separator line
  const drawSectionHeader = (title: string) => {
    y += 4;
    doc.setFont('times', 'bold');
    doc.setFontSize(11.5);
    doc.setTextColor(colorPrimary);
    doc.text(title, marginX, y);
    y += 1.5;
    
    doc.setDrawColor(colorSeparator);
    doc.setLineWidth(0.2);
    doc.line(marginX, y, 210 - marginX, y);
    y += 4.5;
  };

  // Helper to draw bullets with precise indentations
  const drawBullet = (text: string, indentX = 22, spacing = 4) => {
    doc.setFont('times', 'normal');
    doc.setFontSize(9.2);
    doc.setTextColor(colorMuted);
    
    // Draw a small bullet symbol
    doc.text('\u2022', indentX - 3.5, y);
    
    const maxTextWidth = 210 - marginX - indentX;
    const lines = doc.splitTextToSize(text, maxTextWidth);
    lines.forEach((line: string) => {
      doc.text(line, indentX, y);
      y += spacing;
    });
  };

  // --- SECTION 1: SUMMARY ---
  drawSectionHeader('Summary');
  doc.setFont('times', 'normal');
  doc.setFontSize(9.3);
  doc.setTextColor(colorMuted);
  const summaryLines = doc.splitTextToSize(resumeData.summary, 210 - 2 * marginX);
  summaryLines.forEach((line: string) => {
    doc.text(line, marginX, y);
    y += 4;
  });
  y += 1.5;

  // --- SECTION 2: EDUCATION ---
  drawSectionHeader('Education');
  
  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(colorPrimary);
  doc.text(resumeData.education.institution, marginX, y);
  
  doc.setFont('times', 'bold');
  doc.text(resumeData.education.period, 210 - marginX, y, { align: 'right' });
  y += 4;

  doc.setFont('times', 'italic');
  doc.setTextColor(colorMuted);
  doc.setFontSize(9.2);
  doc.text(resumeData.education.degree, marginX, y);
  
  doc.setFont('times', 'normal');
  doc.text(resumeData.education.location, 210 - marginX, y, { align: 'right' });
  y += 5;

  // --- SECTION 3: PROJECTS ---
  drawSectionHeader('Projects');

  resumeData.projects.forEach((project) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(colorPrimary);
    doc.text(project.title, marginX, y);
    
    doc.setFont('times', 'normal');
    doc.setFontSize(9.2);
    doc.setTextColor(colorMuted);
    const projectSub = `  |  ${project.subtitle}`;
    const nameWidth = doc.getTextWidth(project.title);
    doc.text(projectSub, marginX + nameWidth, y);

    // Link for Code/Live
    const linkText = project.hasLive ? 'Code/Live' : 'Code';
    doc.setFont('times', 'bold');
    doc.setTextColor('#0000ee'); // standard link blue
    doc.text(linkText, 210 - marginX, y, { align: 'right' });
    doc.line(210 - marginX - doc.getTextWidth(linkText), y + 0.3, 210 - marginX, y + 0.3);
    doc.link(210 - marginX - doc.getTextWidth(linkText), y - 2.5, doc.getTextWidth(linkText), 3.5, { url: project.codeUrl });
    y += 4.5;

    // Bullets
    project.bullets.forEach((bullet) => {
      drawBullet(bullet);
    });
    
    // Tech used
    doc.setFont('times', 'bold');
    doc.setFontSize(9.2);
    doc.setTextColor(colorPrimary);
    doc.text('Technologies Used:', 22, y);
    doc.setFont('times', 'normal');
    doc.setTextColor(colorMuted);
    
    const techString = ' ' + project.technologies.join(', ');
    const labelWidth = doc.getTextWidth('Technologies Used:');
    const techLines = doc.splitTextToSize(techString, 210 - marginX - 22 - labelWidth);
    
    techLines.forEach((line: string, idx: number) => {
      if (idx === 0) {
        doc.text(line, 22 + labelWidth, y);
      } else {
        doc.text(line, 22, y);
      }
      y += 3.8;
    });
    y += 2.5;
  });

  // --- SECTION 4: TECHNICAL SKILLS ---
  drawSectionHeader('Technical Skills');
  
  doc.setFont('times', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(colorMuted);

  resumeData.technicalSkills.forEach((skill) => {
    doc.setFont('times', 'bold');
    doc.setTextColor(colorPrimary);
    doc.text(`${skill.label}: `, marginX, y);
    
    doc.setFont('times', 'normal');
    doc.setTextColor(colorMuted);
    
    const labelWidth = doc.getTextWidth(`${skill.label}: `);
    const valueLines = doc.splitTextToSize(skill.value, 210 - 2 * marginX - labelWidth);
    
    valueLines.forEach((line: string, idx: number) => {
      if (idx === 0) {
        doc.text(line, marginX + labelWidth, y);
      } else {
        doc.text(line, marginX, y);
      }
      y += 3.8;
    });
    y += 0.4;
  });
  y += 2;

  // --- SECTION 5: ACHIEVEMENTS ---
  drawSectionHeader('Achievements');
  resumeData.achievements.forEach((achievement) => {
    drawBullet(achievement);
  });

  // Save/Download the PDF
  doc.save(`${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`);
}
