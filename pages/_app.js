import Preloader from "@/src/layouts/Preloader";
import Head from "next/head";
import Script from "next/script";
import { Fragment, useEffect, useState } from "react";
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import "/styles/globals.css";
const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // Set dir attribute based on locale with safety checks
    if (typeof window !== 'undefined' && document.documentElement) {
      const isRTL = router.locale === 'ar';
      const direction = isRTL ? 'rtl' : 'ltr';
      const language = router.locale || 'en';
      
      // Only update if values have changed to prevent unnecessary re-renders
      if (document.documentElement.getAttribute('dir') !== direction) {
        document.documentElement.setAttribute('dir', direction);
      }
      if (document.documentElement.getAttribute('lang') !== language) {
        document.documentElement.setAttribute('lang', language);
      }
      
      // Also set on body for extra compatibility
      document.body.setAttribute('dir', direction);
    }
  }, [router.locale]);

  return (
    <Fragment>
      <Head>
        {/*====== Required meta tags ======*/}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="description"
          content="Landscaping, Gardening, Florists, Groundskeeping"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/*====== Title ======*/}
        <title>Gadden - Garden &amp; Landscaping React NextJS Template</title>
        {/*====== Favicon Icon ======*/}
        <link
          rel="shortcut icon"
          href="/assets/images/favicon.ico"
          type="image/png"
        />


      </Head>
      {loading && <Preloader />}
      {!loading && <Component {...pageProps} />}
      
      {/* Chatbase AI Chatbot Script */}
      <Script id="chatbase-script" strategy="afterInteractive">
        {`
          (function(){
            if(!window.chatbase||window.chatbase("getState")!=="initialized"){
              window.chatbase=(...arguments)=>{
                if(!window.chatbase.q){window.chatbase.q=[]}
                window.chatbase.q.push(arguments)
              };
              window.chatbase=new Proxy(window.chatbase,{
                get(target,prop){
                  if(prop==="q"){return target.q}
                  return(...args)=>target(prop,...args)
                }
              })
            }
            const onLoad=function(){
              const script=document.createElement("script");
              script.src="https://www.chatbase.co/embed.min.js";
              script.id="n-1El9dPO5fNkh1KCfHOZ";
              script.domain="www.chatbase.co";
              document.body.appendChild(script);
              
              // Initialize chatbot controls after script loads
              script.onload = () => {
                setTimeout(initializeChatbotControls, 1000);
              };
            };
            if(document.readyState==="complete"){
              onLoad()
            }else{
              window.addEventListener("load",onLoad)
            }
          })();
          
          // Enhanced chatbot control functionality
          function initializeChatbotControls() {
            console.log('Initializing chatbot controls...');
            
            let chatbotButton = null;
            let chatbotIframe = null;
            let isOpen = false;
            let retryCount = 0;
            const maxRetries = 10;
            
            // Utility function to safely get className as string
            function getClassNameString(element) {
              if (!element || !element.className) return '';
              
              if (typeof element.className === 'string') {
                return element.className;
              } else if (element.className.toString) {
                return element.className.toString();
              } else if (element.classList) {
                return Array.from(element.classList).join(' ');
              }
              return '';
            }
            
            function findChatbotElements() {
              // Find the main chatbot button
              chatbotButton = document.querySelector('#chatbase-bubble-button') ||
                             document.querySelector('[id*="chatbase-bubble"]') ||
                             document.querySelector('[class*="chatbase"][class*="button"]') ||
                             document.querySelector('div[onclick*="chatbase"]');
              
              // Find the chat iframe/window
              chatbotIframe = document.querySelector('#chatbase-chat-iframe') ||
                             document.querySelector('[id*="chatbase-chat"]') ||
                             document.querySelector('[id*="chatbase"][id*="iframe"]') ||
                             document.querySelector('iframe[src*="chatbase"]');
              
              console.log('Found elements:', {
                button: !!chatbotButton,
                iframe: !!chatbotIframe,
                buttonId: chatbotButton?.id,
                iframeId: chatbotIframe?.id
              });
              
              if (!chatbotButton && retryCount < maxRetries) {
                retryCount++;
                console.log('Retrying to find chatbot elements...', retryCount);
                setTimeout(findChatbotElements, 500);
                return;
              }
              
              if (chatbotButton) {
                setupChatbotControls();
              } else {
                console.log('Could not find chatbot button after', maxRetries, 'retries');
              }
            }
            
            function isChatbotOpen() {
              // Method 1: Check for chatbase API state first
              if (window.chatbase && typeof window.chatbase === 'function') {
                try {
                  const state = window.chatbase('getState');
                  if (state === 'open' || state === 'opened') return true;
                  if (state === 'closed') return false;
                } catch (e) {
                  // API might not be ready yet
                }
              }
              
              // Method 2: Check iframe visibility  
              if (chatbotIframe) {
                const style = window.getComputedStyle(chatbotIframe);
                const isVisible = style.display !== 'none' && 
                                style.visibility !== 'hidden' && 
                                parseFloat(style.opacity) > 0 &&
                                chatbotIframe.offsetWidth > 0 && 
                                chatbotIframe.offsetHeight > 0;
                if (isVisible) return true;
              }
              
              // Method 3: Check for any visible chatbase chat elements (more comprehensive)
              const chatSelectors = [
                '[id*="chatbase"]:not([id*="bubble"])', 
                '[class*="chatbase"]:not([class*="button"])',
                'iframe[src*="chatbase"]',
                '[id*="n-1El9dPO5fNkh1KCfHOZ"]', // Specific chatbase ID
                'div[style*="position: fixed"][style*="z-index"]:not([id*="bubble"])'
              ];
              
              for (let selector of chatSelectors) {
                const elements = document.querySelectorAll(selector);
                for (let element of elements) {
                  const style = window.getComputedStyle(element);
                  if (style.display !== 'none' && 
                      style.visibility !== 'hidden' && 
                      parseFloat(style.opacity) > 0 &&
                      element.offsetWidth > 50 && // Reduced threshold for better detection
                      element.offsetHeight > 50) {
                    // Additional check: make sure it's actually a chat window, not just a button
                    if (element.offsetWidth > 200 || element.offsetHeight > 200) {
                      return true;
                    }
                  }
                }
              }
              
              // Method 4: Check for our internal state
              return isOpen;
            }
            
            function openChatbot() {
              console.log('Opening chatbot...');
              
              // First, restore any hidden elements that might have been gently hidden
              restoreHiddenElements();
              
              // Method 1: Use Chatbase API
              if (window.chatbase && typeof window.chatbase === 'function') {
                try {
                  window.chatbase('open');
                  console.log('Opened using Chatbase API');
                  return;
                } catch (e) {
                  console.log('Chatbase API open failed:', e);
                }
              }
              
              // Method 2: Find and click original chatbase elements
              const allChatbaseElements = document.querySelectorAll('[id*="chatbase"], [class*="chatbase"]');
              for (let element of allChatbaseElements) {
                // Skip our current button to avoid recursion
                if (element === chatbotButton) continue;
                
                // Look for clickable elements that might be the original button
                if (element.onclick || element.click) {
                  try {
                    if (element.onclick) {
                      element.onclick();
                    } else {
                      element.click();
                    }
                    console.log('Triggered click on original chatbase element');
                    return;
                  } catch (e) {
                    console.log('Failed to click chatbase element:', e);
                  }
                }
              }
              
              // Method 3: Try to trigger the original button inside our button
              if (chatbotButton) {
                const innerElements = chatbotButton.querySelectorAll('*');
                for (let element of innerElements) {
                  if (element.onclick || (element.click && element !== chatbotButton)) {
                    try {
                      if (element.onclick) {
                        element.onclick();
                      } else {
                        element.click();
                      }
                      console.log('Triggered click on inner element');
                      return;
                    } catch (e) {
                      console.log('Failed to click inner element:', e);
                    }
                  }
                }
              }
              
              // Method 4: Dispatch custom event
              const event = new CustomEvent('chatbase-open', { bubbles: true });
              document.dispatchEvent(event);
              console.log('Dispatched custom open event');
            }
            
            function restoreHiddenElements() {
              console.log('Restoring any hidden chatbot elements...');
              
              const chatSelectors = [
                '[id*="chatbase"]:not([id*="bubble"])', 
                '[class*="chatbase"]:not([class*="button"])',
                'iframe[src*="chatbase"]',
                '[id*="n-1El9dPO5fNkh1KCfHOZ"]'
              ];
              
              chatSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                  // Skip if it's clearly the button itself
                  const elementClasses = getClassNameString(element);
                  
                  if (element === chatbotButton || 
                      (element.id && element.id.includes('bubble')) ||
                      (elementClasses && elementClasses.includes('button'))) {
                    return;
                  }
                  
                  // Restore original styles if they were stored
                  if (element.dataset.originalDisplay) {
                    element.style.removeProperty('display');
                    element.style.removeProperty('visibility');
                    element.style.removeProperty('opacity');
                    element.style.removeProperty('z-index');
                    element.style.removeProperty('pointer-events');
                    
                    // Clean up stored data
                    delete element.dataset.originalDisplay;
                    delete element.dataset.originalVisibility;
                    delete element.dataset.originalOpacity;
                    
                    console.log('Restored element:', element.id || element.className);
                  }
                });
              });
              
              // Restore iframe specifically
              if (chatbotIframe && chatbotIframe.dataset.originalDisplay) {
                chatbotIframe.style.removeProperty('display');
                chatbotIframe.style.removeProperty('visibility');
                chatbotIframe.style.removeProperty('opacity');
                chatbotIframe.style.removeProperty('z-index');
                
                // Clean up stored data
                delete chatbotIframe.dataset.originalDisplay;
                delete chatbotIframe.dataset.originalVisibility;
                delete chatbotIframe.dataset.originalOpacity;
                
                console.log('Restored chatbot iframe');
              }
            }
            
            function closeChatbot() {
              console.log('Closing chatbot...');
              
              // Set internal state immediately
              isOpen = false;
              
              // Method 1: Use Chatbase API (primary method)
              if (window.chatbase && typeof window.chatbase === 'function') {
                try {
                  window.chatbase('close');
                  console.log('Closed using Chatbase API');
                  
                  // Update button visual state
                  if (chatbotButton) {
                    chatbotButton.classList.remove('chatbot-open');
                  }
                  
                  // Let the API handle closing naturally first
                  setTimeout(() => {
                    // Only apply fallback methods if API didn't work
                    if (isChatbotOpen()) {
                      console.log('API close failed, applying fallback methods...');
                      applyFallbackClose();
                    }
                  }, 500);
                  
                  return; // Exit early if API is available
                } catch (e) {
                  console.log('Chatbase API close failed:', e);
                }
              }
              
              // Fallback methods if API is not available
              applyFallbackClose();
            }
            
            function applyFallbackClose() {
              console.log('Applying fallback close methods...');
              
              // Method 2: Try to find and click close buttons first (least destructive)
              const closeButtonSelectors = [
                '[aria-label*="close" i]',
                '[title*="close" i]',
                '[class*="close"]',
                '[id*="close"]',
                'button[type="button"]:not([id*="bubble"])'
              ];
              
              let closeButtonClicked = false;
              closeButtonSelectors.forEach(selector => {
                if (closeButtonClicked) return;
                
                const buttons = document.querySelectorAll(selector);
                buttons.forEach(button => {
                  if (closeButtonClicked) return;
                  
                  // Make sure it's within a chatbase element
                  let parent = button.parentElement;
                  let isInChatbot = false;
                  while (parent && parent !== document.body) {
                    const parentClasses = getClassNameString(parent);
                    
                    if ((parent.id && (parent.id.includes('chatbase') || parent.id.includes('chat'))) ||
                        (parentClasses && (parentClasses.includes('chatbase') || parentClasses.includes('chat')))) {
                      isInChatbot = true;
                      break;
                    }
                    parent = parent.parentElement;
                  }
                  
                  if (isInChatbot) {
                    try {
                      button.click();
                      closeButtonClicked = true;
                      console.log('Clicked close button');
                    } catch (e) {
                      // Ignore click errors
                    }
                  }
                });
              });
              
              // Method 3: Gentle hide with proper cleanup (if close button didn't work)
              if (!closeButtonClicked) {
                const chatSelectors = [
                  '[id*="chatbase"]:not([id*="bubble"])', 
                  '[class*="chatbase"]:not([class*="button"])',
                  'iframe[src*="chatbase"]',
                  '[id*="n-1El9dPO5fNkh1KCfHOZ"]'
                ];
                
                chatSelectors.forEach(selector => {
                  const elements = document.querySelectorAll(selector);
                  elements.forEach(element => {
                    // Skip if it's clearly the button itself
                    const elementClasses = getClassNameString(element);
                    
                    if (element === chatbotButton || 
                        (element.id && element.id.includes('bubble')) ||
                        (elementClasses && elementClasses.includes('button'))) {
                      return;
                    }
                    
                    // Gentle hiding - preserve element for reuse
                    element.style.setProperty('display', 'none', 'important');
                    element.style.setProperty('visibility', 'hidden', 'important');
                    element.style.setProperty('opacity', '0', 'important');
                    
                    // Store original styles for restoration
                    if (!element.dataset.originalDisplay) {
                      element.dataset.originalDisplay = element.style.display || 'block';
                      element.dataset.originalVisibility = element.style.visibility || 'visible';
                      element.dataset.originalOpacity = element.style.opacity || '1';
                    }
                  });
                });
                
                // Handle iframe specifically but gently
                if (chatbotIframe) {
                  chatbotIframe.style.setProperty('display', 'none', 'important');
                  chatbotIframe.style.setProperty('visibility', 'hidden', 'important');
                  chatbotIframe.style.setProperty('opacity', '0', 'important');
                  
                  // Store original iframe styles
                  if (!chatbotIframe.dataset.originalDisplay) {
                    chatbotIframe.dataset.originalDisplay = chatbotIframe.style.display || 'block';
                    chatbotIframe.dataset.originalVisibility = chatbotIframe.style.visibility || 'visible';
                    chatbotIframe.dataset.originalOpacity = chatbotIframe.style.opacity || '1';
                  }
                }
              }
              
              // Method 4: Dispatch close events
              const closeEvents = [
                new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, which: 27, bubbles: true }),
                new CustomEvent('chatbase-close', { bubbles: true })
              ];
              
              closeEvents.forEach(event => {
                document.dispatchEvent(event);
              });
              
              // Update button visual state
              if (chatbotButton) {
                chatbotButton.classList.remove('chatbot-open');
              }
              
              console.log('Fallback close sequence completed');
            }
            
            function setupChatbotControls() {
              if (!chatbotButton) return;
              
              console.log('Setting up chatbot controls...');
              
              // Store original onclick handler before replacing
              let originalOnClick = null;
              if (chatbotButton.onclick) {
                originalOnClick = chatbotButton.onclick.bind(chatbotButton);
              }
              
              // Store original click handlers from child elements
              const originalHandlers = [];
              const clickableElements = chatbotButton.querySelectorAll('*');
              clickableElements.forEach(element => {
                if (element.onclick) {
                  originalHandlers.push({
                    element: element,
                    handler: element.onclick.bind(element)
                  });
                }
              });
              
              // Remove existing event listeners by cloning the button
              const newButton = chatbotButton.cloneNode(true);
              chatbotButton.parentNode.replaceChild(newButton, chatbotButton);
              chatbotButton = newButton;
              
              // Update openChatbot to use stored handlers
              function openChatbotWithOriginal() {
                console.log('Opening chatbot with original handlers...');
                
                // First, restore any hidden elements
                restoreHiddenElements();
                
                // Try original onclick first
                if (originalOnClick) {
                  try {
                    originalOnClick();
                    console.log('Used original button onclick');
                    return;
                  } catch (e) {
                    console.log('Original onclick failed:', e);
                  }
                }
                
                // Try stored child handlers
                for (let handler of originalHandlers) {
                  try {
                    handler.handler();
                    console.log('Used stored child handler');
                    return;
                  } catch (e) {
                    console.log('Stored handler failed:', e);
                  }
                }
                
                // Fallback to original openChatbot
                openChatbot();
              }
              
              // Add our custom click handler
              chatbotButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                console.log('Chatbot button clicked');
                
                // Check current state more thoroughly
                const currentlyOpen = isChatbotOpen();
                console.log('Current state:', currentlyOpen ? 'open' : 'closed', 'Internal state:', isOpen);
                
                if (currentlyOpen || isOpen) {
                  console.log('Attempting to close chatbot...');
                  closeChatbot();
                  // Update visual state immediately
                  chatbotButton.classList.remove('chatbot-open');
                  isOpen = false;
                  
                  // Double-check closure after a short delay
                  setTimeout(() => {
                    const stillOpen = isChatbotOpen();
                    if (stillOpen) {
                      console.log('First close attempt failed, trying again...');
                      closeChatbot();
                    }
                  }, 500);
                  
                } else {
                  console.log('Attempting to open chatbot...');
                  openChatbotWithOriginal();
                  // Update visual state immediately
                  chatbotButton.classList.add('chatbot-open');
                  isOpen = true;
                  
                  // Verify state after a delay to allow for opening animation
                  setTimeout(() => {
                    const actuallyOpen = isChatbotOpen();
                    console.log('State after open attempt:', actuallyOpen ? 'open' : 'closed');
                    if (!actuallyOpen) {
                      // If it didn't actually open, revert the visual state
                      chatbotButton.classList.remove('chatbot-open');
                      isOpen = false;
                      console.log('Open attempt failed, trying alternative method...');
                      // Try one more time with a different approach
                      setTimeout(() => {
                        // Check if iframe might be corrupted and needs refresh
                        if (chatbotIframe && chatbotIframe.src) {
                          console.log('Attempting to refresh chatbot iframe...');
                          const originalSrc = chatbotIframe.src;
                          chatbotIframe.src = '';
                          setTimeout(() => {
                            chatbotIframe.src = originalSrc;
                          }, 100);
                        }
                        
                        openChatbot();
                        isOpen = true;
                        chatbotButton.classList.add('chatbot-open');
                      }, 200);
                    }
                  }, 1000);
                }
                
                return false;
              }, true);
              
              // Click outside to close - improved detection
              document.addEventListener('click', function(e) {
                // Double check if chatbot is actually open
                const actuallyOpen = isChatbotOpen();
                if (!actuallyOpen && !isOpen) return;
                
                // Check if click is on chatbot elements
                let isClickOnChatbot = false;
                
                // Check if clicked on button
                if (chatbotButton && (chatbotButton.contains(e.target) || chatbotButton === e.target)) {
                  isClickOnChatbot = true;
                }
                
                // Check if clicked on chat window/iframe
                if (chatbotIframe && (chatbotIframe.contains(e.target) || chatbotIframe === e.target)) {
                  isClickOnChatbot = true;
                }
                
                // Check all possible chatbase elements more comprehensively
                const chatbaseSelectors = [
                  '[id*="chatbase"]',
                  '[class*="chatbase"]', 
                  '[id*="n-1El9dPO5fNkh1KCfHOZ"]',
                  'iframe[src*="chatbase"]',
                  '[data-chatbase]',
                  '[id*="chat"][id*="widget"]',
                  '[id*="chat"][id*="window"]',
                  '[class*="chat"][class*="widget"]'
                ];
                
                for (let selector of chatbaseSelectors) {
                  const elements = document.querySelectorAll(selector);
                  for (let element of elements) {
                    if (element.contains(e.target) || element === e.target) {
                      isClickOnChatbot = true;
                      break;
                    }
                  }
                  if (isClickOnChatbot) break;
                }
                
                // Additional check: look up the DOM tree from the clicked element
                let currentElement = e.target;
                while (currentElement && currentElement !== document.body) {
                  if (currentElement.id && (
                      currentElement.id.includes('chatbase') || 
                      currentElement.id.includes('n-1El9dPO5fNkh1KCfHOZ') ||
                      currentElement.id.includes('chat')
                    )) {
                    isClickOnChatbot = true;
                    break;
                  }
                  
                  // Safe className check - handle both string and DOMTokenList
                  const classNames = getClassNameString(currentElement);
                  
                  if (classNames && (
                      classNames.includes('chatbase') ||
                      classNames.includes('chat')
                    )) {
                    isClickOnChatbot = true;
                    break;
                  }
                  currentElement = currentElement.parentElement;
                }
                
                if (!isClickOnChatbot) {
                  console.log('Click outside detected, closing chatbot');
                  closeChatbot();
                  if (chatbotButton) {
                    chatbotButton.classList.remove('chatbot-open');
                  }
                  isOpen = false;
                }
              }, true); // Use capture phase for better detection
              
              // ESC key to close
              document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && isChatbotOpen()) {
                  console.log('ESC key pressed, closing chatbot');
                  closeChatbot();
                  chatbotButton.classList.remove('chatbot-open');
                  isOpen = false;
                }
              });
              
              // Monitor DOM changes to update iframe reference
              const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                  if (mutation.type === 'childList') {
                    // Look for new iframe elements
                    mutation.addedNodes.forEach(function(node) {
                      if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'IFRAME' && node.src && node.src.includes('chatbase')) {
                          chatbotIframe = node;
                          console.log('Found new chatbot iframe:', node.id);
                        } else if (node.id && node.id.includes('chatbase') && node.id.includes('chat')) {
                          chatbotIframe = node;
                          console.log('Found new chatbot element:', node.id);
                        }
                      }
                    });
                  }
                });
              });
              
              observer.observe(document.body, {
                childList: true,
                subtree: true
              });
              
              // Periodic state synchronization
              setInterval(() => {
                const actuallyOpen = isChatbotOpen();
                if (actuallyOpen !== isOpen) {
                  console.log('State mismatch detected. Actual:', actuallyOpen, 'Internal:', isOpen);
                  isOpen = actuallyOpen;
                  if (chatbotButton) {
                    if (actuallyOpen) {
                      chatbotButton.classList.add('chatbot-open');
                    } else {
                      chatbotButton.classList.remove('chatbot-open');
                    }
                  }
                }
              }, 2000); // Check every 2 seconds
              
              console.log('Chatbot controls setup completed');
            }
            
            // Start finding elements
            findChatbotElements();
          }
        `}
      </Script>
    </Fragment>
  );
};
export default appWithTranslation(App);
