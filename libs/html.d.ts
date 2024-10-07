/*!
Html library by datkat21 on GitHub. Licensed under MIT
https://github.com/datkat21/html
!*/
export default class Html {
    /** The HTML element referenced in this instance. Change using `.swapRef()`, or remove using `.cleanup()`. */
    elm: HTMLInputElement | HTMLElement;
    /**
     * Create a new instance of the Html class.
     * @param elm The HTML element to be created or classified from.
     */
    constructor(elm: string | HTMLElement);
    /**
     * Sets the text of the current element.
     * @param val The text to set to.
     * @returns Html
     */
    text(val: string): Html;
    /**
     * Sets the text of the current element.
     * @param val The text to set to.
     * @returns Html
     */
    html(val: string): Html;
    /**
     * Safely remove the element. Can be used in combination with a `.swapRef()` to achieve a "delete & swap" result.
     * @returns Html
     */
    cleanup(): Html;
    /**
     * querySelector something.
     * @param selector The query selector.
     * @returns The HTML element (not as Html)
     */
    query(selector: string): HTMLElement | null;
    /**
     * An easier querySelector method.
     * @param query The string to query
     * @returns a new Html
     */
    qs(query: string): Html | null;
    /**
     * An easier querySelectorAll method.
     * @param query The string to query
     * @returns a new Html
     */
    qsa(query: string): Array<Html | null> | null;
    /**
     * Sets the ID of the element.
     * @param val The ID to set.
     * @returns Html
     */
    id(val: string): Html;
    /**
     * Toggle on/off a class.
     * @param val The class to toggle.
     * @returns Html
     */
    class(...val: string[]): Html;
    /**
     * Toggles ON a class.
     * @param val The class to enable.
     * @returns Html
     */
    classOn(...val: string[]): Html;
    /**
     * Toggles OFF a class.
     * @param val The class to disable.
     * @returns Html
     */
    classOff(...val: string[]): Html;
    /**
     * Apply CSS styles (dashed method.) Keys use CSS syntax, e.g. `background-color`.
     * @param obj The styles to apply (as an object of `key: value;`.)
     * @returns Html
     */
    style(obj: {
        [x: string]: string | null;
    }): Html;
    /**
     * Apply CSS styles (JS method.) Keys use JS syntax, e.g. `backgroundColor`.
     * @param obj The styles to apply (as an object of `key: value;`)
     * @returns Html
     */
    styleJs(obj: {
        [key: string]: string | null;
    }): Html;
    /**
     * Apply an event listener.
     * @param ev The event listener type to add.
     * @param cb The event listener callback to add.
     * @returns Html
     */
    on(ev: string, cb: EventListenerOrEventListenerObject): Html;
    /**
     * Remove an event listener.
     * @param ev The event listener type to remove.
     * @param cb The event listener callback to remove.
     * @returns Html
     */
    un(ev: string, cb: EventListenerOrEventListenerObject): Html;
    /**
     * Retrieve the corresponding HTMLElement.
     * @param element The element to retrieve. Can be an HTMLElement, Html instance, or a string (as query selector).
     * @returns The corresponding HTMLElement or null if QS and element are not found.
     */
    getElement(element: HTMLElement | Html | string): HTMLElement;
    /**
     * Append this element to another element. Uses `appendChild()` on the parent.
     * @param parent Element to append to. HTMLElement, Html, and string (as querySelector) are supported.
     * @returns Html
     */
    appendTo(parent: HTMLElement | Html | string): Html;
    /**
     * Prepend this element to another element. Uses `prepend()` on the parent.
     * @param parent Element to append to. HTMLElement, Html, and string (as querySelector) are supported.
     * @returns Html
     */
    prependTo(parent: HTMLElement | Html | string): Html;
    /**
     * Append an element. Typically used as a `.append(new Html(...))` call.
     * @param elem The element to append.
     * @returns Html
     */
    append(elem: string | HTMLElement | Html): Html;
    /**
     * Prepend an element. Typically used as a `.prepend(new Html(...))` call.
     * @param elem The element to prepend.
     * @returns Html
     */
    prepend(elem: string | HTMLElement | Html): Html;
    /**
     * Append multiple elements. Typically used as a `.appendMany(new Html(...), new Html(...)` call.
     * @param elements The elements to append.
     * @returns Html
     */
    appendMany(...elements: any[]): Html;
    /**
     * Prepend multiple elements. Typically used as a `.prependMany(new Html(...), new Html(...)` call.
     * @param elements The elements to prepend.
     * @returns Html
     */
    prependMany(...elements: any[]): Html;
    /**
     * Clear the innerHTML of the element.
     * @returns Html
     */
    clear(): Html;
    /**
     * Set attributes (object method.)
     * @param obj The attributes to set (as an object of `key: value;`)
     * @returns Html
     */
    attr(obj: {
        [x: string]: any;
    }): Html;
    /**
     * Set the text value of the element. Only works if element is `input` or `textarea`.
     * @param str The value to set.
     * @returns Html
     */
    val(str: any): Html;
    /**
     * Retrieve text content from the element. (as innerText, not trimmed)
     * @returns string
     */
    getText(): string;
    /**
     * Retrieve HTML content from the element.
     * @returns string
     */
    getHtml(): string;
    /**
     * Retrieve the value of the element. Only applicable if it is an `input` or `textarea`.
     * @returns string
     */
    getValue(): string;
    /**
     * Swap the local `elm` with a new HTMLElement.
     * @param elm The element to swap with.
     * @returns Html
     */
    swapRef(elm: HTMLElement): Html;
    /**
     * An alternative method to create an Html instance.
     * @param elm Element to create from.
     * @returns Html
     */
    static from(elm: HTMLElement | string): Html | null;
    /**
     * An easier querySelector method.
     * @param query The string to query
     * @returns a new Html
     */
    static qs(query: string): Html | null;
    /**
     * An easier querySelectorAll method.
     * @param query The string to query
     * @returns a new Html
     */
    static qsa(query: string): Array<Html | null> | null;
}
